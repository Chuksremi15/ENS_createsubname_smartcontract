// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "./EnsRegistry.sol";
import "./EnsResolver.sol";

import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

/**
 * @title EnsSubdomainFactory
 * @dev Allows to create and configure a subdomain for Ethereum ENS in one call.
 * After deploying this contract, change the owner of the domain you want to use
 * to this deployed contract address. For example, transfer the ownership of "startonchain.eth"
 * so anyone can create subdomains like "radek.startonchain.eth".
 */
contract EnsSubdomainFactory is ERC1155Holder, ERC721Holder {
	address public owner;
	address public registryAddress;
	address public resolverAddress;
	EnsRegistry public registry;
	EnsResolver public resolver;
	bool public locked;
	bytes32 emptyNamehash = 0x00;

	event SubdomainCreated(
		address indexed creator,
		address indexed owner,
		string subdomain,
		string domain,
		string topdomain
	);
	event OwnershipTransferred(
		address indexed previousOwner,
		address indexed newOwner
	);
	event RegistryUpdated(
		address indexed previousRegistry,
		address indexed newRegistry
	);
	event ResolverUpdated(
		address indexed previousResolver,
		address indexed newResolver
	);
	event DomainTransfersLocked();

	constructor(address _owner, address _registry, address _resolver) {
		owner = _owner;
		registry = EnsRegistry(_registry);
		resolver = EnsResolver(_resolver);
		registryAddress = _registry;
		resolverAddress = _resolver;
		locked = false;
	}

	/**
	 * @dev Throws if called by any account other than the owner.
	 *
	 */
	modifier onlyOwner() {
		require(msg.sender == owner);
		_;
	}

	/**
	 * @dev Allows to create a subdomain (e.g. "radek.startonchain.eth"),
	 * set its resolver and set its target address
	 * @param _subdomain - sub domain name only e.g. "radek"
	 * @param _domain - domain name e.g. "startonchain"
	 * @param _topdomain - parent domain name e.g. "eth", "xyz"
	 * @param _owner - address that will become owner of this new subdomain
	 * @param _target - address that this new domain will resolve to
	 */
	function newSubdomain(
		string calldata _subdomain,
		string calldata _domain,
		string calldata _topdomain,
		address _owner,
		address _target
	) public {
		//create namehash for the topdomain
		bytes32 topdomainNamehash = keccak256(
			abi.encodePacked(
				emptyNamehash,
				keccak256(abi.encodePacked(_topdomain))
			)
		);
		//create namehash for the domain
		bytes32 domainNamehash = keccak256(
			abi.encodePacked(
				topdomainNamehash,
				keccak256(abi.encodePacked(_domain))
			)
		);

		//create labelhash for the sub domain
		bytes32 subdomainLabelhash = keccak256(abi.encodePacked(_subdomain));
		//create namehash for the sub domain
		bytes32 subdomainNamehash = keccak256(
			abi.encodePacked(domainNamehash, subdomainLabelhash)
		);

		//create new subdomain, temporarily this smartcontract is the owner
		registry.setSubnodeOwner(
			domainNamehash,
			subdomainLabelhash,
			address(this)
		);
		//set public resolver for this domain
		registry.setResolver(subdomainNamehash, resolverAddress);
		//set the destination address
		resolver.setAddr(subdomainNamehash, _target);
		//change the ownership back to requested owner
		registry.setOwner(subdomainNamehash, _owner);

		emit SubdomainCreated(
			msg.sender,
			_owner,
			_subdomain,
			_domain,
			_topdomain
		);
	}

	/**
	 * @dev Returns the owner of a domain (e.g. "startonchain.eth"),
	 * @param _domain - domain name e.g. "startonchain"
	 * @param _topdomain - parent domain name e.g. "eth" or "xyz"
	 */
	function domainOwner(
		string calldata _domain,
		string calldata _topdomain
	) public view returns (address) {
		bytes32 topdomainNamehash = keccak256(
			abi.encodePacked(
				emptyNamehash,
				keccak256(abi.encodePacked(_topdomain))
			)
		);
		bytes32 namehash = keccak256(
			abi.encodePacked(
				topdomainNamehash,
				keccak256(abi.encodePacked(_domain))
			)
		);
		return registry.owner(namehash);
	}

	/**
	 * @dev Return the owner of a subdomain (e.g. "radek.startonchain.eth"),
	 * @param _subdomain - sub domain name only e.g. "radek"
	 * @param _domain - parent domain name e.g. "startonchain"
	 * @param _topdomain - parent domain name e.g. "eth", "xyz"
	 */
	function subdomainOwner(
		string calldata _subdomain,
		string calldata _domain,
		string calldata _topdomain
	) public view returns (address) {
		bytes32 topdomainNamehash = keccak256(
			abi.encodePacked(
				emptyNamehash,
				keccak256(abi.encodePacked(_topdomain))
			)
		);
		bytes32 domainNamehash = keccak256(
			abi.encodePacked(
				topdomainNamehash,
				keccak256(abi.encodePacked(_domain))
			)
		);
		bytes32 subdomainNamehash = keccak256(
			abi.encodePacked(
				domainNamehash,
				keccak256(abi.encodePacked(_subdomain))
			)
		);
		return registry.owner(subdomainNamehash);
	}

	/**
	 * @dev Return the target address where the subdomain is pointing to (e.g. "0x12345..."),
	 * @param _subdomain - sub domain name only e.g. "radek"
	 * @param _domain - parent domain name e.g. "startonchain"
	 * @param _topdomain - parent domain name e.g. "eth", "xyz"
	 */
	function subdomainTarget(
		string calldata _subdomain,
		string calldata _domain,
		string calldata _topdomain
	) public view returns (address) {
		bytes32 topdomainNamehash = keccak256(
			abi.encodePacked(
				emptyNamehash,
				keccak256(abi.encodePacked(_topdomain))
			)
		);
		bytes32 domainNamehash = keccak256(
			abi.encodePacked(
				topdomainNamehash,
				keccak256(abi.encodePacked(_domain))
			)
		);
		bytes32 subdomainNamehash = keccak256(
			abi.encodePacked(
				domainNamehash,
				keccak256(abi.encodePacked(_subdomain))
			)
		);
		address currentResolver = registry.resolver(subdomainNamehash);
		return EnsResolver(currentResolver).addr(subdomainNamehash);
	}

	/**
	 * @dev The contract owner can take away the ownership of any domain owned by this contract.
	 * @param _node - namehash of the domain
	 * @param _owner - new owner for the domain
	 */
	function transferDomainOwnership(
		bytes32 _node,
		address _owner
	) public onlyOwner {
		require(!locked);
		registry.setOwner(_node, _owner);
	}

	/**
	 * @dev The contract owner can lock and prevent any future domain ownership transfers.
	 */
	function lockDomainOwnershipTransfers() public onlyOwner {
		require(!locked);
		locked = true;
		emit DomainTransfersLocked();
	}

	/**
	 * @dev Allows to update to new ENS registry.
	 * @param _registry The address of new ENS registry to use.
	 */
	function updateRegistry(address _registry) public onlyOwner {
		require(
			registryAddress != _registry,
			"new registry should be different from old"
		);
		emit RegistryUpdated(registryAddress, _registry);
		registry = EnsRegistry(_registry);
		registryAddress = _registry;
	}

	/**
	 * @dev Allows to update to new ENS resolver.
	 * @param _resolver The address of new ENS resolver to use.
	 */
	function updateResolver(address _resolver) public onlyOwner {
		require(
			resolverAddress != _resolver,
			"new resolver should be different from old"
		);
		emit ResolverUpdated(resolverAddress, _resolver);
		resolver = EnsResolver(_resolver);
		resolverAddress = _resolver;
	}

	/**
	 * @dev Allows the current owner to transfer control of the contract to a new owner.
	 * @param _owner The address to transfer ownership to.
	 */
	function transferContractOwnership(address _owner) public onlyOwner {
		require(_owner != address(0), "cannot transfer to address(0)");
		emit OwnershipTransferred(owner, _owner);
		owner = _owner;
	}

	receive() external payable {}
}
