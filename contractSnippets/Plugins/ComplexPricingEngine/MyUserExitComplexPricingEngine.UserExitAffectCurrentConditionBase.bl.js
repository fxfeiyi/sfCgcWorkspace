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
 * @function UserExitAffectCurrentConditionBase
 * @this ComplexPricingEngine
 * @kind plugin
 * @namespace CUSTOM
 * @param {Object} OrderAttributes
 * @param {Object} UserExitId
 * @param {Object} CurrentCalcStepAttributes
 * @param {Object} VariantAttributes
 * @param {Object} ModifiedBase
 * @param {Object} CurrentTotal
 * @param {Object} ProductAttributes
 * @returns ModifiedBases
 */
function UserExitAffectCurrentConditionBase(OrderAttributes, UserExitId, CurrentCalcStepAttributes, VariantAttributes, ModifiedBase, CurrentTotal, ProductAttributes){
    var me = this;
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                           //
    //               Add your customizing javaScript code below.                                 //
    //                                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////////////
    
    /**
     * Use the UserExitAffectCurrentConditionBase user exit to change the calculation base and the scale base (if step is a scaled step) of the current calculation step.
     *  Returns: Object ModifiedBases, which contain the affected calculation base and the affected scale base.
     *
     *   PARAMETER	                DESCRIPTION	
     *   OrderAttributes	        Set of order attributes available in the pricing engine by default.	
     *   UserExitId	                Id/Name of the user exit. The user exit must have code which holds the algorithm for this ID. Typically a “switch case” statement is used to handle in each case block a different ID.
     *   CurrentCalcStepAttributes  List of calculation step attributes.
     *   VariantAttributes	        Obsolete … can be ignored because the variant attributes are now part of the ProductAttributes parameter. Just still in because of backward compatibility
     *   ModifiedBase	            Base values of the condition. cBase is the condition base and scale base is the value used to evaluate the scales.
     *   CurrentTotal	            Current Total is the current value of the position. 
     *                              e.g. if it is an order item the current total is changing after each calculation step which found a condition and is granting discounts or surcharges.
     *   ProductAttributes	        Set of product/orderItem attributes available in the pricing engine by default.
     * 
     *   RETURNS: ModifiedBases     Holds the modified cBase and scaleBase values.
     *                              {
     *                                 "cBase":<changed condition base>, 
     *                                 "scaleBase": <changed scale base>
     *                              }
     *                             NOTE: Both values are optional. If you only change cBase no need to add scaleBase to the JSON object vice versa
     *
     *   DESCRIPTION AND EXAMPLE:
     *   This user exit type can be used to manipulate the condition base used for calculation. Depending on the condition type the base can be quantity or value:
     *
     *   Example Price Calculation (Base is Quantity):
     *   Result = Quantity x Found Condition value
     *   → In this scenario the so called condition base is the Quantity
     *
     *   Example Percentage Discounts (Base is reference value):
     *   Result = Total value of the order item - (Percentage value based on reference value)
     *       - For example you have a order item value after base price calculation which is 200 $ 
     *       - Then there are several steps which add surcharges to the order items which result in 210 $
     *       - Then the percentage discount calculation step is executed with 10 Percent of but “based” on the price without surcharges
     *         In this case the reference value to calculate the 10 percent off is 200 $ and not 210 $
     *         The “condition base” is 200 $ → Result = 200 $ x 0.10 % = 20 $
     *
     *         NOTE: Manipulating the condition base has impact to the calculation result
     */
		
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                           //
    //               Add your customizing javaScript code above.                                 //
    //                                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    return ModifiedBases;
}