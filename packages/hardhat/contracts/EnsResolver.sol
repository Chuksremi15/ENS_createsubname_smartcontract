pragma solidity >=0.8.4;

/**
 * @title EnsResolver
 * @dev Extract of the interface for ENS Resolver
 */
interface EnsResolver {
	function setAddr(bytes32 node, address addr) external;

	function addr(bytes32 node) external view returns (address);
}
