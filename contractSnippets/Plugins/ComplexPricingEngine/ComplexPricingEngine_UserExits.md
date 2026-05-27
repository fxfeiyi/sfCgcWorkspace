******************************
ComplexPricing / PPP UserExits
******************************

In this folder you can find a set of PPP UserExit template methods:

  * MyUserExitComplexPricingEngine.UserExitAffectCalculationResult.bl.js
  * MyUserExitComplexPricingEngine.UserExitAffectCurrentConditionBase.bl.js
  * MyUserExitComplexPricingEngine.UserExitSkipCurrentCalcStep.bl.js
  * MyUserExitComplexPricingEngine.UserExitSkipCurrentSearchStrategyStep.bl.js

These methods need to follow the signatures (parameters and return values) of the provided templates.
Additional details about the UserExits is available within the corresponding template methods.
The UserExits are called and orchestrated by the PPP engine when available.
If you want to use such UserExits, copy the respective template method(s) next to the PPP engine at "src/Plugins/ComplexPricingEngine".
All UserExits are "optional", meaning if you need one type of UserExit (e.g. 'SkipCurrentCalcStep'), there is no need to take over all four methods.
Taking over just the "MyUserExitComplexPricingEngine.UserExitSkipCurrentCalcStep.bl.js" method would be sufficient in this scenario.