"use strict";

///////////////////////////////////////////////////////////////////////////////////////////////
//                 IMPORTANT - DO NOT MODIFY AUTO-GENERATED CODE OR COMMENTS                 //
//Parts of this file are auto-generated and modifications to those sections will be          //
//overwritten. You are allowed to modify:                                                    //
// - the tags in the jsDoc as described in the corresponding section                         //
// - the function name and its parameters                                                    //
// - the function body between the insertion ranges                                          //
//         "Add your customizing javaScript code below / above"                              //
//                                                                                           //
// NOTE:                                                                                     //
// - If you have created PRE and POST functions, they will be executed in the same order     //
//   as before.                                                                              //
// - If you have created a REPLACE to override core function, only the REPLACE function will //
//   be executed. PRE and POST functions will be executed in the same order as before.       //
//                                                                                           //
// - For new customizations, you can directly modify this file. There is no need to use the  //
//   PRE, POST, and REPLACE functions.                                                       //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Use the following jsDoc tags to describe the BL function. Setting these tags will
 * change the runtime behavior in the mobile app. The values specified in the tags determine
 * the name of the contract file. The filename format is “@this . @function .bl.js”.
 * For example, LoVisit.BeforeLoadAsync.bl.js
 * -> function: Name of the businessLogic function.
 * -> this: The LO, BO, or LU object that this function belongs to (and it is part of the filename).
 * -> kind: Type of object this function belongs to. Most common value is "businessobject".
 * -> async: If declared as async then the function should return a promise.
 * -> param: List of parameters the function accepts. Make sure the parameters match the function signature.
 * -> module: Use CORE or CUSTOM. If you are a Salesforce client or an implementation partner, always use CUSTOM to enable a seamless release upgrade.
 * -> maxRuntime: Maximum time this function is allowed to run, takes integer value in ms. If the max time is exceeded, error is logged.
 * -> returns: Type and variable name in which the return value is stored.
 * @function UserExitSkipCurrentSearchStrategyStep
 * @this ComplexPricingEngine
 * @kind plugin
 * @namespace CUSTOM
 * @param {Object} OrderAttributes
 * @param {Object} UserExitId
 * @param {Object} VariantAttributes
 * @param {Object} ProductAttributes
 * @returns SkipSearchStep
 */
function UserExitSkipCurrentSearchStrategyStep(OrderAttributes, UserExitId, VariantAttributes, ProductAttributes){
    var me = this;
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                           //
    //               Add your customizing javaScript code below.                                 //
    //                                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////////////
    
    /**
     * Use the UserExitSkipCurrentSearchStrategyStep user exit to skip one step in a search strategy.
     * This user exit type can be used to skip a search step used in a search strategy. If the search step is skipped the system does not execute the condition search for this search step and proceeds with the next search step.
     *  Returns: Boolean value SkipSearchStep. Specifies whether to skip the current search strategy.
     *
     *   PARAMETER	                DESCRIPTION	
     *   OrderAttributes	        Set of order attributes available in the pricing engine by default.	
     *   UserExitId	                Id/Name of the user exit. The user exit must have code which holds the algorithm for this ID. Typically a “switch case” statement is used to handle in each case block a different ID.
     *   VariantAttributes	        Obsolete … can be ignored because the variant attributes are now part of the ProductAttributes parameter. Just still in because of backward compatibility       
     *   ProductAttributes	        Set of product/orderItem attributes available in the pricing engine by default.
     * 
     *   RETURNS: SkipSearchStep    Boolean (true/false)
     *                                 If true then the calculation step is skipped.
     *                                 If false then the calculation step is executed
     */
		
   
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                           //
    //               Add your customizing javaScript code above.                                 //
    //                                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    return SkipSearchStep;
}