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
 * @function UserExitAffectCalculationResult
 * @this ComplexPricingEngine
 * @kind plugin
 * @namespace CUSTOM
 * @param {Object} OrderAttributes
 * @param {Object} UserExitId
 * @param {Object} CurrentCalcStepAttributes
 * @param {Object} VariantAttributes
 * @param {Object} AffectableResults
 * @param {Object} ProductAttributes
 * @returns AffectedResults
 */
function UserExitAffectCalculationResult(OrderAttributes, UserExitId, CurrentCalcStepAttributes, VariantAttributes, AffectableResults, ProductAttributes){
    var me = this;
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                           //
    //               Add your customizing javaScript code below.                                 //
    //                                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////////////
    
    /**
     *  Use the UserExitAffectCalculationResult user exit to modify all calculation variables after the calculation. You can edit base, value, result, and the current total in this step.
     *  Returns: Object AffectedResults, which contain all four effectible calculation values.
     *
     *   PARAMETER	                DESCRIPTION	
     *   OrderAttributes	        Set of order attributes available in the pricing engine by default.	
     *   UserExitId	                Id/Name of the user exit. The user exit must have code which holds the algorithm for this ID. Typically a “switch case” statement is used to handle in each case block a different ID.
     *   CurrentCalcStepAttributes  List of calculation step attributes.
     *   VariantAttributes	        Obsolete … can be ignored because the variant attributes are now part of the ProductAttributes parameter. Just still in because of backward compatibility
     *   AffectableResults	        Holds all the values which can be overwritten by AffectedResults (Values before modification)
     *   ProductAttributes	        Set of product/orderItem attributes available in the pricing engine by default.
     *   
     *   RETURNS: AffectedResults   Holds the modified currentCalculationBase, currentCalculationResult, currentConditionValue and currentTotal.
     *                              {
     *                                 "currentCalculationBase":    <changed calculation base>, 
     *                                 "currentCalculationResult":  <changed calculation result>
     *                                 "currentConditionValue":     <changed condition value>
     *                                 "currentTotal":              <changed total>
     *                              }
     *                             NOTE: Both values are optional. If you only change cBase no need to add scaleBase to the JSON object vice versa
     *
     *   DESCRIPTION AND EXAMPLE:
     *   This user exit type can be used to manipulate the inputs used for the calculation and the calculation result itself.
     *
     *   NOTE: 
     *   Theoretically it is possible to manipulate only the calculation result without manipulating the inputs. Best practice is to change the inputs and the results so that output of the user exit is a reasonable calculation. *   If that is not done logfile and the pricing monitoring tool will show calculations which are not reasonable and which will lead to confusion of the reviewer.
     *
     *   e.g. if you modify the base price result from:
     *   10 (quantity) x 1.99 (condition value) = 19.90 (condition result)
     *   to a condition result of 29.90 then you should also change the condition value to 29.99 / 10:
     *   10 (quantity) x 2.99 (condition value) = 29.90 (condition result)
     */
		
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                           //
    //               Add your customizing javaScript code above.                                 //
    //                                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    return AffectedResults;
}