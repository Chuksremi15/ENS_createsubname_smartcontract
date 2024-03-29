/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  11155111: {
    EnsSubdomainFactory: {
      address: "0xA6907920f08cB32776B89A866dC217b54114ec7A",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_owner",
              type: "address",
            },
            {
              internalType: "address",
              name: "_registry",
              type: "address",
            },
            {
              internalType: "address",
              name: "_resolver",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [],
          name: "DomainTransfersLocked",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousRegistry",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newRegistry",
              type: "address",
            },
          ],
          name: "RegistryUpdated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousResolver",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newResolver",
              type: "address",
            },
          ],
          name: "ResolverUpdated",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "creator",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "subdomain",
              type: "string",
            },
            {
              indexed: false,
              internalType: "string",
              name: "domain",
              type: "string",
            },
            {
              indexed: false,
              internalType: "string",
              name: "topdomain",
              type: "string",
            },
          ],
          name: "SubdomainCreated",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_domain",
              type: "string",
            },
            {
              internalType: "string",
              name: "_topdomain",
              type: "string",
            },
          ],
          name: "domainOwner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "lockDomainOwnershipTransfers",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "locked",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_subdomain",
              type: "string",
            },
            {
              internalType: "string",
              name: "_domain",
              type: "string",
            },
            {
              internalType: "string",
              name: "_topdomain",
              type: "string",
            },
            {
              internalType: "address",
              name: "_owner",
              type: "address",
            },
            {
              internalType: "address",
              name: "_target",
              type: "address",
            },
          ],
          name: "newSubdomain",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256[]",
              name: "",
              type: "uint256[]",
            },
            {
              internalType: "uint256[]",
              name: "",
              type: "uint256[]",
            },
            {
              internalType: "bytes",
              name: "",
              type: "bytes",
            },
          ],
          name: "onERC1155BatchReceived",
          outputs: [
            {
              internalType: "bytes4",
              name: "",
              type: "bytes4",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "bytes",
              name: "",
              type: "bytes",
            },
          ],
          name: "onERC1155Received",
          outputs: [
            {
              internalType: "bytes4",
              name: "",
              type: "bytes4",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "bytes",
              name: "",
              type: "bytes",
            },
          ],
          name: "onERC721Received",
          outputs: [
            {
              internalType: "bytes4",
              name: "",
              type: "bytes4",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "registry",
          outputs: [
            {
              internalType: "contract EnsRegistry",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "registryAddress",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "resolver",
          outputs: [
            {
              internalType: "contract EnsResolver",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "resolverAddress",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_subdomain",
              type: "string",
            },
            {
              internalType: "string",
              name: "_domain",
              type: "string",
            },
            {
              internalType: "string",
              name: "_topdomain",
              type: "string",
            },
          ],
          name: "subdomainOwner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_subdomain",
              type: "string",
            },
            {
              internalType: "string",
              name: "_domain",
              type: "string",
            },
            {
              internalType: "string",
              name: "_topdomain",
              type: "string",
            },
          ],
          name: "subdomainTarget",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes4",
              name: "interfaceId",
              type: "bytes4",
            },
          ],
          name: "supportsInterface",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_owner",
              type: "address",
            },
          ],
          name: "transferContractOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "_node",
              type: "bytes32",
            },
            {
              internalType: "address",
              name: "_owner",
              type: "address",
            },
          ],
          name: "transferDomainOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_registry",
              type: "address",
            },
          ],
          name: "updateRegistry",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_resolver",
              type: "address",
            },
          ],
          name: "updateResolver",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          stateMutability: "payable",
          type: "receive",
        },
      ],
      inheritedFunctions: {
        onERC1155BatchReceived: "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol",
        onERC1155Received: "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol",
        supportsInterface: "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol",
        onERC721Received: "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol",
      },
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
