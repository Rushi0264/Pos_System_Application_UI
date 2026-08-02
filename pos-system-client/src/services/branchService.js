import * as branchApi from "../api/branchApi";


const branchService = {

 createBranch: branchApi.createBranch,

 getBranchById: branchApi.getBranchById,

 getBranchesByStore: branchApi.getBranchesByStore,

 getAllBranches: branchApi.getAllBranches,

 updateBranch: branchApi.updateBranch,

 deleteBranch: branchApi.deleteBranch

};


export default branchService;