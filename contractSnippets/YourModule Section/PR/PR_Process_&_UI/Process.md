# Process (PR) Contract Definition

## Description
Process Contracts describe a process execution flow.
The main goal of this document is to have a common understanding of the different elements that constitute a definition of a Process Contract.

## Contract Defintion
The following sections describe all elements that can be used in a Process Contract.

## Root Node (Process Node)
This is the Root element in a Process Contract definition. The following attributes must be defined within this element.

## Properties
| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|Process|no|Process node (root) of a process contract| |
|Process.@name|String|no| Unique identifier of the process. The name must adhere to the following naming convention: <Namespace>::<Processname>  - naming convention (FQN)!?|no|
|Process.@defaultAction|String|no|name of the Action to be executed immediatly after process initialization|no|
|Process.@schemaVersion |String|no |version of the design contract|no |
|Process.@ignoreMultiViewStack|String|yes, no default|comboBox values: "true", "false" and  "[empty]"| |
|Process.Entry||no|Entry node, multiplicity 1, see **Entry specification**|| 
|Process.Entry.ProcessContext||no|ProcessContext node, containing variable definitions, multiplicity 1, see **ProcessContext specification**| |
|Process.Entry.EntryActions||no|EntryActions node, contains list of actions executed after process initialization, multiplicity 1, see **EntryActions specification**| |
|Process.Body| |no|Body node, multiplicity 1, see **Body specification**| |
|Process.Body.Actions||no|Actions node, contains list of actions defined for the process, multiplicity 1, see **Actions specification**| |
|Process.ExitHandlers||yes|ExitHandlers node, multiplicity 0..1, see **ExitHandlers specification**| |
|Process.ExternalEvents||yes|ExternalEvents node, multiplicity 0..1, see **ExternalEvents**| |

In addition to these attributes, a Process Contract must define an **Entry** element and a **Body** element. Optionally there can be an **ExitHandlers** element as well.

## Example
```
<Process name="MyApplication::OverviewProcess" defaultAction="ShowOverview" schemaVersion="1.0">
  <Entry>
    <!-- Entry element definition-->
    <ProcessContext />
    <EntryActions />
  </Entry>
  <Body>
    <!-- Body Element definition -->
    <Actions />
  </Body>
  <ExitHandlers>
    <!-- ExitHandlers Element definition -->
  </ExitHandlers>
</Process>
```

### Entry
The Entry element in a Process Contract definition is mandatory. Within the Entry element a set of Process Context Declarations can be defined. Additionally, a set of Parameters passed to the Process as well as a List of DataSources can be specified. The Entry element may also define a set of Process Actions that will be executed as Entry Actions before the process is started.

#### ProcessContext
The ProcessContext element contains the list of variables declared in the process as well as the list of parameters passed to the process.

#### Properties
| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|ProcessContext| |no|ProcessContext node, multiplicity 1| |
|ProcessContext.Declarations| |no|Declarations node, multiplicity 1||
|ProcessContext.Declarations.Declaration| |no|Declaration node, multiplicity 0..N , see **ProcessContext Variable specification** | |
|ProcessContext.Parameters| |no|Parameters node, multiplicity 1| |
|ProcessContext.Parameters.Input| |no|Parameter node, multiplicity 0..N, , see **ProcessContext Parameter specification** | |

#### Example
```
<ProcessContext>
    <Declarations>
        <Declaration name="MyVariable" type="MyObjectClass" />
    </Declarations>
    <Parameters>
        <Input name="CustomerPKey" type="DomPKey" />
    </Parameters>
</ProcessContext>
```

##### Declaration
The ProcessContext declarations section contains elements definining global process variables which can be used during the process execution or by the UI for data binding.

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|@name|String|no|process variable name|check for unique variable name|
|@type|String|no|type of the process variable| |

##### Parameter
The ProcessContext parameters section contains elements defining parameters passed to the process.

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|@name|String|no|process parameter name|check for unique parameter name|
|@type|String|no|type of the process parameter| |

### EntryActions
The EntryActions element contains definitions of Actions that will be executed as a part of the initialization step of the Process. Entry Actions will be executed immediately after the variable declarations are processed and  before the process execution is started. Entry actions are intended to prepare the process for its execution. Typically Entry Actions are responsible for pre-loading information that are necessary to start the process. Actions of type View, Navigation and Process, which will be described later, should obviously not be used as entry actions.Entry actions follow the general rules for actions as described in chapter Action. Entry actions are performed in the order in which they are defined in the contract. After execution of all entry actions, the process defaultAction (see process root element) is executed.

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|EntryActions| |no|EntryActions node, multiplicity 1| |
|EntryActions.Action| |no|Action node, multiplicity 0..N, see **Action specification**||

### Example
```
<EntryActions>
  <Action name="LoadOrderCount" actionType="LOAD" type="LuOrderCount">
    <Return name="ProcessContext::LuOrderCount" />
  </Action>
</EntryActions>
```

## Body
The Body element defines a set of process actions that describe the process execution flow.

### Actions
The Actions element contains the definitions of the various Process Actions that are part of the process execution flow.

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|Actions| |no|Actions node, multiplicity 1| |
|Actions.Action| |no|Action node, multiplicity 0..N, see **Action specification**||

### Example
```
<Actions>
  <Action name="CreateValidationBo" actionType="CREATE" type="BoWizardAddProduct">
    <Return name="ProcessContext::ValidationBo" />
  </Action>
</Actions>
```

## Action
The Action element describes a specified process activity that should be executed at a given time during the process execution.Actions could be event-driven (executed when a given event occures  - see Events) or could be executed explicitly during transitions in the process execution flow (see TransitionTo element). The following attribues are defined in an Action element:

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|@name|String|no|name of the action||
|@actionType|String|no|The value of actionType must be one of the following Literals:<ul><li> LOAD<li> SAVE<li> CREATE<li> VIEW<li> LOGIC<li> PROCESS<li> DECISION<li> NAVIGATION<li> CONFIRM<li> VALIDATION<li> MASTER_DETAIL_HANDLER<li> END<li> SCAN<li> PRINT </ul>The different action types are described in the following sections. ||
|@call |String|used only if actionType=LOGIC|The value of the call attribute should be a full qualified name  of the business method to be executed (called).| |
|@parameter|String|used only if actionType=DECISION|This attribute is only used in combination with a DECISION Action. It generally contains the name of the variable whose values is part of the decision criterias.||
|@type |String|used only if actionType= LOAD, SAVE or CREATE|In case of LOAD, SAVE and CREATE Actions the value of the type attribute is the object class type of the BusinessObject or ListObject to be loaded or saved.|
|@process |String|used only if actionType=PROCESS|The name of the Process to start when this action is executed. The value if a full qualified name of a given Process i.ee <Namespace>::<ProcessName>||

 ### LOAD Action
 LOAD Actions are generally used to load data into an instance of a given object type. An instance of the given object type will be created before loading the data. The object type maybe for example an existing BusinessObject or ListObject.

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|@name|String|no|action name|unique in list of actions|
|@actionType|String|no|action type, "LOAD"| |
|@type|String|no|valid data type, e.g. modeled data type (BO,LO,LU, Domain) or java script data type|?|
|Parameters| |yes|parameters node, input to the LOAD action, see **Parameters specification**| |
|Return| |no|return value specification of the LOAD action, see **Return specification**| |
|TransitionTo| |yes|continuation action specification when the LOAD action has been executed, see **TransitionTo specification**| |

### Example
```
<!-- Action definition containing parameters, return value, transition to another action -->
<Action name="LoadCallCustomerDetail" actionType="LOAD" type="LoCustomerCall">
  <Parameters>
    <Input name="bpaMainPKey" value="ProcessContext::CustomerDetail.pKey" />
  </Parameters>
  <Return name="ProcessContext::CustomerCallList" />
</Action>
```

### SAVE Action
SAVE Actions are generally used to save an instance or a list of a given object type declared within the process. The object type maybe for example a BusinessObject or ListObject.
(question) All objects to be saved must be passed as Action parameters (see Parameters element for more details).

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|@name|String|no|action name|unique in list of actions|
|@actionType|String|no|action type, "SAVE"| |
|Parameters| |yes|parameters node, input to the SAVE action, see **Parameters specification**| |
|TransitionTo| |yes|continuation action specification when the SAVE action has been executed, see **TransitionTo specification**| |

### Example
```
<!-- Action definition containing parameters, transition to another action --> 
<Action name="SaveContactPartner" actionType="SAVE"> 
    <Parameters> 
        <Object value="ProcessContext::ContactPartner" />
    </Parameters> 
    <TransitionTo action="ReloadContactPartner"/> 
</Action>
```


### CREATE Action
The CREATE Action could be used to create an instance of a given Business Object. This action may define input parameters needed to create this BO instance. The Action returns a reference to the created BO instance. The reference can be stored in the Process or Application Context. 

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|@name|String|no|action name|unique in list of actions|
|@actionType|String|no|action type, "CREATE"| |
|@type|String|no|valid data type, e.g. modeled data type (BO,LO,LU, Domain) or java script data type|?|
|Parameters| |yes|parameters node, input to the LOAD action, see **Parameters specification**| |
|Return| |no|return value specification of the LOAD action, see **Return specification**| |
|TransitionTo| |yes|continuation action specification when the LOAD action has been executed, see **TransitionTo specification**| |

### Example
```
<!-- Action definition containing parameters and return value -->
<Action name="CreateContactPartner" actionType="CREATE" type="BoContactPartner">
  <Parameters>
    <Input name="CustomerPKey" value="ProcessContext::CustomerDetail.pKey" />
  </Parameters>
  <Return name="ProcessContext::ContactPartnerDetail" />
</Action>
```

### VIEW Action
The VIEW Action is used to render a given UI (see UIDescription element). The VIEW Action also declares event handling for the defined user interface as well as ExitHandlers used for validations.

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|@name|String|no|action name|unique in list of actions|
|@actionType|String|no|action type, "VIEW"| |
|UIDescription| |no|contains reference to user interface contract, multiplicity 1|check for valid user interface ref|
|Events| |yes|Events node, multiplicity 1| |
|Events.Event| |yes|Event node, multiplicity 0..N| |
|Events.Event.@name|String|no|name of the event handled|check for valid event reference to user interface contract?|
|Events.Event.@action|String|no|name of another action of the process which should be executed when this event is raised|check for valid action|
|ExitHandlers| |yes|ExitHandlers node, multiplicity 1, see **ExitHandlers specification**| |

### Example
```
<!-- UI Description, Event handling and Exit Handlers -->
<Action actionType="View" name="ShowCallDetail">
  <UIDescription>Call::CompleteTabUI</UIDescription>
  <Events>
    <Event name="completeCall" action="CheckOpenOrders" />
    <Event name="responsibleLookup" action="OpenResponsibleLookup" />
  </Events>
  <ExitHandlers>
    <ExitHandler handlerName="validateCallDate" type="CustomValidate" name="ProcessContext::MainBO">
      <Method name="validateCallDate" />
    </ExitHandler>
  </ExitHandlers>
</Action>
```

### LOGIC Action
The LOGIC Action is used to call a given business logic funtion from the API or a method defined within the process.

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|@name|String|no|action name|unique in list of actions|
|@actionType|String|no|action type, "LOGIC"| |
|@call|String|no|name of a business logic method (of ProcessContext / ApplicationContext) or framework method|?|
|Parameters| |yes|parameters node, input to the LOGIC action, see **Parameters specification**| |
|Return| |yes|return value specification of the LOGIC action, see **Return specification**| |
|TransitionTo| |yes|continuation action specification when the LOGIC action has been executed, see **TransitionTo specification**| |

### Example
```
<!-- define input parameters, return values and transition to another action if applicable --> 
<Action name="LoadRoleObjects" actionType="LOGIC" call="ProcessContext::CustomerDetail.loadRoleObjectsAsync"> 
    <Parameters> 
        <Input name="bReload" type="Literal" value="0" /> 
    </Parameters> 
    <TransitionTo action="SetEARightsForRolesTab" /> 
</Action> 

<Action name="GetMainAddress" actionType="LOGIC" call="ProcessContext::CustomerDetail.LoCustomerAddress.getMainAddress"> 
    <Return name="ProcessContext::MainAddress" /> 
</Action>

<!-- Utils.identity is a kind of echo function and return the value of the input parameter-->
<Action name="Set_DataLoaded" actionType="LOGIC" call="Utils.identity">
    <Parameters>
        <Input name="value" value="1" type="Literal" />
    </Parameters>
    <Return name="ProcessContext::CardReportingSurveyExceptions_DataLoaded" />
    <TransitionTo action="SetMaximizedMode" />
</Action>

```

### PROCESS Action
PROCESS Actions are used to start a new process (sub-process) from the current process. In the following example, the process started is Customer::AssignNewPOSWizardProcess. The Process Action may return one or more values as shown in the example. The name of the return value is a reference to a variable in the process context.

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|@name|String|no|action name|unique in list of actions|
|@actionType|String|no|action type, "PROCESS"| |
|@process|String|no|name of another process|valid process of model|
|Parameters| |yes|parameters node, input to the PROCESS action, see **Parameters specification**| |
|ReturnValues| |yes|return values specification of the PROCESS action, see **ReturnValues specification**| |
|TransitionTo| |yes|continuation action specification when the PROCESS action has been executed, see **TransitionTo specification**| |

### Example
```
<!-- return values and transition to another action if applicable --> 
<Action actionType="PROCESS" name="AssignNewPOSWizard" process="Customer::AssignNewPOSWizardProcess"> 
    <ReturnValues> 
        <Return name="ProcessContext::PosName" value="posName" /> 
        <Return name="ProcessContext::PosMetaPKey" value="posMetaPKey" /> 
        <Return name="ProcessContext::PosGeometryPKey" value="posGeometryPKey" /> 
        <Return name="ProcessContext::CreateNew_ButtonPressed" value="buttonPressed" /> 
    </ReturnValues> 
    <TransitionTo action="AssignNewPOSWizard_Decision" /> 
</Action>
```

### NAVIGATION Action
New “defaultLabel” Attribute required for Process node of a Navigation Action:

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|@name|String|no|action name|unique in list of actions|
|@actionType|String|no|action type, "NAVIGATION"| |
|Parameters| |yes|parameters node, input to the NAVIGATION action, see **Processes Parameters specification**| |
|TransitionTo| |yes|continuation action specification when the NAVIGATION action has been executed, see **TransitionTo specification**| |

### Example
```
<Action actionType="NAVIGATION" name="StartSalesNavigation">   
    <Parameters name="ProcessContext::NavigationName">    
        <Processes selectedId="Questionaire">       
            <Process id="Questionaire" image="CheckListGrey24" label="questionnaire" defaultLabel="Questionnaire" action="StartQuestionProcess" />       
            <Process id="Notes" image="NoteGrey24" label="notes" defaultLabel="Notes" action="StartNotesProcess" />    
        </Processes> 
    </Parameters>   
    <TransitionTo action="StartQuestionProcess" /> 
</Action>
```

### DECISION Action
The DECISION action is used to evalute an input parameter and take action based on its value.cases specification of the DECISION action, see **Case specification** 

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|@name|String|no|action name|unique in list of actions|
|@actionType|String|no|action type, "DECISION"| |
|@parameter|String|no|parameter name on which is used for the decision making|?|
|Case| |yes|at least on case has to specified for the DECISION action, see **Case specification**| |
|CaseEmpty| |yes| at least on case has to specified for the DECISION action, see **Case specification**| |
|CaseElse| |yes| at least on case has to specified for the DECISION action, see **Case specification**| |

### Example
```
<!-- Take another action based on an provided parameter -->
<Action name="ContextMenuResultDecision" actionType="DECISION" parameter="Event.selected">
  <Case value="DeleteOpeningHour" action="DeleteOpeningHour" />
  <Case value="DeleteAddress" action="DeleteAddress" />
  <Case value="DeleteContact" action="DeleteContact" />
  <Case value="DeletePOS" action="DeletePOS" />
  <Case value="DiscontinuePOS" action="DiscontinuePOS" />
</Action>
```
### CONFIRM Action
The CONFIRM action is used to decide whether pending changes should be kept or discarded.

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|@name|String|no|action name|unique in list of actions|
|@actionType|String|no|action type, "CONFIRM"| |
|@confirmType|String|no|confirmation message type, e.g. "Ok", "YesNo" etc.|check for supported type|
|Message| |no|message node, multiplicity 1| |
|Message.@messageId|String|no|reference to a (confirmation) message id in the model (global label contract?)|check for valid message id|
|Cases| |no|cases node, multiplicity 1| |
|Cases.Case| |no|case node, mutliplicity 1..N where N is the overall number of options for the confirmation type, see **Case specification**| |

### Example
```
<!-- Cancel Changes? -->
<Action name="CancelOpeningHourChanges" actionType="CONFIRM" confirmType="YesNo">
  <Message messageId="CasConfirmCancelMsg" />
  <Cases>
    <Case value="Yes" action="removeCreatedOpeningHour" />
    <Case value="No" action="" />
  </Cases>
</Action>
```

### VALIDATION Action
The VALIDATION action is used to check/validate an BO by using a validation business logic function.

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|@name|String|no|action name|unique in list of actions|
|@actionType|String|no|action type, "VALIDATION"| |
|Validations| |no|validations node, multiplicity 1| |
|Validations.Validation| |no|validation node, multiplicity 1..N| |
|Validations.Validation.@name|String|no|reference to validation method (business logic) of a BO (ProcessContext / ApplicationContext variable)|check for valid validation method|
|TransitionTo| |yes|continuation action specification when the VALIDATION action has been executed, see **TransitionTo specification**| |

### Example
```
<!-- Validation Opening Hour after click Done Button -->
<Action name="ValidateOpeningHours" actionType="VALIDATION" >
  <Validations>
     <Validation name="ProcessContext::CustomerDetail.validateCustomerOpeningTime"/>
  </Validations>
</Action>
```

### MASTER DATAIL HANDLER Action
The MASTER DETAIL HANDLER action type is used to manage the correlation between a MasterList (List Object) and a DetailObject (Business Object).

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|@name|String|no|action name|unique in list of actions|
|@actionType|String|no|action type, "MASTER_DETAIL_HANDLER"| |
|MasterList| |no|MasterList node, multiplicity 1| |
|MasterList.@name|String|no|reference to list object variable from ProcessContext| |
|MasterList.ItemUnselected| |no|ItemUnselected node, multiplicity 1| |
|MasterList.ItemUnselected.@type|String|no|option what should be done if an item is unselected (RELOAD, UPDATE, NONE)|check for valid option|
|DetailObject| |no|DetailObject node, multiplicity 1| |
|DetailObject.@name|String|no|reference to business object variable of ProcessContext|check for valid variable|
|DetailObject.@objectClass|String|no|type of the business object variable|check for valid variable type|
|DetailObject.Save| |no|Save node, multiplicity 1| |
|DetailObject.Save.@type|String|no|option when the detail object should be saved (DIRTY, ALWAYS, NEVER)|check for valid option|
|DetailObject.Save.@confirmation|Boolean|no|option if a confirmation is required before saving|check for valid option|
|DetailObject.Save.@validate|Boolean|no|option if a validation of the detail object should be performed before saving|check for valid option|
|DetailObject.Delete| |yes|Delete node, multiplicity 1| |
|DetailObject.Delete.@confirmation|Boolean|no|Should the delete action show a confirmation message Yes/No ?| |
|DetailObject.Delete.@messageId|String|no|The ID of the delete confirmation message label| |
|DetailObject.Delete.@nextCurrent|String|no|Which item will get the focus after deletion (First/Prev/Next/Last/None)| |
|DetailObject.Create| |yes|Create node, multiplicity 1| |
|DetailObject.Create@autoSave|Boolean|no|AutoSave after create action Yes/No ?| |
|DetailObject.Create.WizardProcess| |no|WizardProcess node| |
|DetailObject.Create.WizardProcess.@name|String|no|The name of a valid wizard process| |
|DetailObject.Create.WizardProcess@submitParameter|String|no|Valid Parameter| |
|DetailObject.Create.WizardProcess.Parameters| |no|Parameter-List| |
|DetailObject.Create.WizardProcess.Parameters.Input| |yes|Parameter-Node| |
|DetailObject.Create.WizardProcess.Parameters.Input.@name|String|no|self explaining| |
|DetailObject.Create.WizardProcess.Parameters.Input.@value|String|no|"     "| |
|DetailObject.Create.WizardProcess.ReturnValues| |no|List of return values| |
|DetailObject.Create.WizardProcess.ReturnValues.Return| |yes|ReturnValue-Node|| 
|DetailObject.Create.WizardProcess.ReturnValues.Return.@name|String|no|self explaining| |
|DetailObject.Create.WizardProcess.ReturnValues.Return.@value|String|no|"      "| |
|TransitionTo| |yes|continuation action specification when the VALIDATION action has been executed, see **TransitionTo specification**| |

### Example
```
<Action name="CustomerListMasterDetail" actionType="MASTER_DETAIL_HANDLER"> 
    <MasterList name="ProcessContext::CustomerList"> 
        <!--RELOAD|UPDATE|NONE--> 
        <ItemUnselected type="RELOAD" /> 
    </MasterList> 
    <DetailObject name="ProcessContext::CustomerDetail" objectClass="BoCustomer"> 
        <!--type="DIRTY|ALWAYS|NEVER" confirmation="TRUE|FALSE" validate="TRUE|FALSE" --> 
        <Save type="DIRTY" confirmation="FALSE" validate="FALSE" /> 
        <Delete confirmation="true" messageId=".ConfirmDeletionID" nextCurrent="Next" /> 
        <Create autoSave="true"> 
            <WizardProcess name="Customer::CallCustomerReviewProcess" submitParameter="customerPKey"> 
                <Parameters> 
                    <Input name="CustomerPKey" value="ProcessContext::CustomerPKey" /> 
                </Parameters> 
                <ReturnValues> 
                    <Return name="SaveFlag" value="ProcessContext::saveFlag" />
                </ReturnValues> 
            </WizardProcess> 
        </Create>   
    </DetailObject> 
    <TransitionTo action="TabDecision" /> 
</Action>
```

### END Action
The END action type is used to exit the current process.

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|@name|String|no|action name|unique in list of actions|
|@actionType|String|no|action type, "END"| |
|ReturnValues| |yes|ReturnValues node, see **ReturnValues specification**| |

### Example
```
<Action actionType="END" name="End">
  <ReturnValues>
    <Return name="dateFrom" value="ProcessContext::DateFrom" />
    <Return name="timeFrom" value="ProcessContext::TimeFrom" />
    <Return name="buttonPressed" value="Event.buttonPressed" />
  </ReturnValues>
</Action>
```

### SCAN Action
The SCAN action type is used to capture a "Scan Event"

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|@name|String|no|Action Name|unique in list of actions|
|@actionType|String|no|action type "SCAN"| |
|Return| |yes|return value specification of the LOGIC action, see **Return specification**| |
|TransitionTo| |yes|continuation action specification when the SCAN action has been executed, see **TransitionTo specification**| |

### Example
```
<Action name="BarCode" actionType="SCAN"> 
    <TransitionTo action="FindProduct" /> 
    <Return name="ProcessContext::EAN" /> 
</Action>
```

### PRINT Action

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|@name|String|no|Action Name|unique in list of actions|
|@actionType|String|no|action type "PRINT"| |
|Parameters| |yes|parameters node, input to the PRINT action, see **Parameters specification**| |
|ParameterizedInputs| |yes|parameterized input to PRINT action, specification see **ParamterizedInputs**| |
|TransitionTo| |yes|continuation action specification when the PRINT action has been executed, see **TransitionTo specification**| |
|Return| |yes|return value specification of the PRINT action, see **Return specification**| |

### Example
```
<Action name="actionPrint" actionType="PRINT" printId="anyPrintId"> 
    <Parameters> 
        <Input name="param_1" value="myObject" /> 
        <Input name="param_2" value="myOtherObject" /> 
    </Parameters> 
    <TransitionTo action="anyOtherAction" /> 
</Action>
```

## Action Sub Elements

### Parameters
The Parameters element is applicable for multiple action types including LOGIC, LOAD, PROCESS, PRINT and CREATE actions. It describes the parameters passed to a certain action.
| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|Parameters| |no|Parameters node, multiplicity 1| |
|Parameters.Input| |no|Input node, multiplicity 1..N|| 
|Parameters.Input.@name| |no|name of the input parameter|check for unique parameter name|
|Parameters.Input.@type| |yes|type of the input parameter<ul><li>applicable for unbound variables only ("Literal")<li>not used for all referenced variables from ProcessContext/|ApplicationContext</ul>|check for valid type|
|Parameters.Input.@value| |no|reference to a ProcessContext / ApplicationContext / Event variable or Literal value|check for valid reference?|
|Parameters.Input@passOwnership|Boolean|yes||Only Relevant for PROCESS Actions is used if the instantiated Object should be saved in the called Process, not in the own process.||
|Parameters.Input@validateOnExit|Boolean|yes|Only Relevant for PROCESS Actions is used to specify if object should be validated on exit.||
|Filters| | |(available for parameters of PrintActions only!)| |
|OrderCriteria| | |(available for parameters of PrintActions only!)| |
|Aggregations| | |(available for parameters of PrintActions only!)| |
|Correlation| | |(available for parameters of PrintActions only!)| |

### Example
```
<Parameters>
  <Input name="bpaMetaName" value="ProcessContext::BpaMetaName" />
  <Input name="bpaMetaPKey" value="ProcessContext::BpaMetaPKey" />
  <Input name="myValue" type="Literal" value="42" />
</Parameters>
```

#### Parameter Filter
It is possible to specify Parameter Filters for ListObjects that are passed to the print engine. Filters are optional.

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|Filters| |yes|Filters node, multiplicity 1| |
|Filters.Filter| |yes|Input node, multiplicity 1..N| |
|Filters.Filter.@fieldName| |no|fieldName of filter (ListItem-Attribute)|check if valid LI attribute|
|Filters.Filter.@operator| |no|operator of type<ul><li>=<li><<li><=<li>><li>>=</ul>|check for valid operator|
|Filters.Filter.@value| |no|value to compare/check|check/validation ?|

#### Example
```
<Input name="parameter01" value="any" type="Literal">
    <Filters>
        <Filter fieldName="attribute" operator="EQ" value="valid" />
    </Filters>
</Input>
```

####  Parameter OrderCriteria
It is possible to specify Parameter OrderCriteria for ListObjects that are passed to the print engine. Order Criteria are optional.

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|OrderCriteria| |yes|Criteria node, multiplicity 1| |
|OrderCriteria.OrderCriterion| |yes|Input node, multiplicity 1..N| |
|OrderCriteria.OrderCriterion.@fieldName| |no|fieldName of OrderCriterion (ListItem-Attribute)|check if valid LI attribute|
|OrderCriteria.OrderCriterion.@direction| |no|operator of type<ul><li>ASC<li>DESC</ul>|check for valid operator|

#### Example
```
<Input name="Parameter01" value="ParameterValue" type="Literal">            
  <Filters>              
    <Filter fieldName="FilterParam" operator="EQ" value="FilterValue" />            
  </Filters>            
  <OrderCriteria>              
    <OrderCriterion fieldName="OrderParam" direction="DESC" />            
  </OrderCriteria>          
</Input>
```

#### Parameter Aggregations

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|Aggregations| |yes|Aggregations node, multiplicity 1| |
|Aggregation.Sum| |yes|Sum node, multiplicity 1..N| |
|Aggregation.Sum.@fieldName| |no|fieldName of Sum (ListItem-Attribute)|check if valid LI attribute|

#### Example
```
<Aggregations>
    <Sum fieldName="test1" />
</Aggregations>
```

#### Parameter Correlation

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|Correlation| |yes|Correlation node, multiplicity 1| |
|Correlation.@Name| |no| | |
|Correlation.@Value| |yes|(propertyGrid: "Correlated ListObject")| |
|Correlation.@Key| |yes| | |
|Correlation.@CorrelationKey| |yes| | |
|Correlation.@Prefix| |yes| | |
|Correlation.@TargetName| |yes| | |
|Correlation.Filters| |yes|Filters node, multiplicity 1||
 
#### Example
```
<Correlation name="demoCorr" value="TestLo" key="theKey" correlationKey="theCorrKey" prefix="_" targetName="theTargetName">
    <Filters>
        <Filter fieldName="corrFilter1" operator="NE" value="anyValue" />
        <Filter fieldName="corrFilter2" operator="GE" value="anyValue" />
    </Filters>
</Correlation>
```

####  Parameter Correlations Fitlers
Correlation Filters are equal to InputParemeter Filters

###  Processes
The Processes element can be found at NAVIGATION actions only. It is a special type of an Parameter element that contains navigation information to different other PROCESSES.

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|Parameters| |no|Parameters node, multiplicity 1| |
|Parameters.@name|String|no|reference to ProcessContext variable with navigation name||
|Parameters.Processes| |no|Processes node, multiplicity 1| |
|Parameters.Processes.@selectedId|String|no|identifier of the preselected process for the navigation| |
|Parameters.Processes.Process| |no|Process node, multiplicity 1..N| |
|Parameters.Processes.Process.@id|String |no|identifier of the process|check for unique identifier|
|Parameters.Processes.Process.@image|String|no|reference to image id|check for valid image id|
|Parameters.Processes.Process.@label|String|no|reference to label id|check for valid label id|
|Parameters.Processes.Process.@defaultLabel|String|no|default label for the process| |
|Parameters.Processes.Process.@action|String|no|name of another action of the process|check for valid action|
|Parameters.Processes.Process.@process|String|yes|reference to another process|check for valid process|

### Example
```
<Parameters name="ProcessContext::NavigationName">
  <Processes selectedId="ItemList">
    <Process id="ItemList" image="ShoppingCartItemGrey24" label="orderItems" defaultLabel="Items" process="Order::ItemListTabProcess" action="setCurrentTabName_itemList" />
    <Process id="Notes" image="NoteGrey24" label="notes" defaultLabel="Notes" process="Order::NotesTabProcess" action="Notes_Load_Decision" />
    <Process id="Header" image="InfoGrey24" label="orderHeader" defaultLabel="Header" process="Order::HeaderTabProcess" action="Workflow_Load_Decision" />
  </Processes>
</Parameters>
```

###  Return
The Return element is also applicable for multiple action types like LOGIC, LOAD, CREATE and PROCESS actions. It describes the information returned a certain action.

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|Return| |no|Return node, multiplicity 1| |
|Return.@name|String|no|reference to ProcessContext / ApplicationContext variable| check for valid variable|
 
### Example
```
<Return name="ProcessContext::MainAddress" />
```

###  ReturnValues
The ReturnValues element can be used for PROCESS and END actions. It describes the data returned by an action.

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|ReturnValues| |no|ReturnValues node, multiplicity 1| ☺
|ReturnValues.Return| |no|Return node, multiplicity 1..N| |
|ReturnValues.Return.@name|String|no|reference to ProcessContext / ApplicationContext variable|check for valid variable|
|ReturnValues.Return.@value|String|no|name of the variables returned by the process||
|ReturnValues.Return.@type|String|yes|used to specify Literals (type="Literal") or not existant| |

### Example
```
<ReturnValues>
  <Return name="ProcessContext::PosName" value="posName" />
  <Return name="ProcessContext::PosMetaPKey" value="posMetaPKey" />
  <Return name="ProcessContext::PosGeometryPKey" value="posGeometryPKey" />
  <Return name="ProcessContext::CreateNew_ButtonPressed" value="buttonPressed" />
  <Return name="ProcessContext::buttonPressed" type="Literal" value="create" />
</ReturnValues>
```

###  TransitionTo
The TransitionTo element can be found at different action types (LOGIC, LOAD, CREATE, SAVE, PROCESS, VALIDATION, MASTER_DETAIL_HANDLER). It is used to specify the follow-up action of a certain action. 

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|TransitionTo| |no|TransitionTo node, multiplicity 1| |
|TransitionTo.@action| |no|name of another action of the process|check for valid action. Fixed value "End" is also valid.|

### Example
```
<TransitionTo action="GetAttachmentCount" />
```

### Case
The Case/Cases element(s) can be found in actions of type DECISION and CONFIRM. These elements are used to evaluate a parameter and take different actions based on its value.

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|Case| |yes|Case node, multiplicity 0..N| |
|Case.@value|String|no|value specified to match for this case| |
|Case.@action|String|no|name of another action of the process|check for valid action name|
|CaseEmpty| |yes|CaseEmpty node, multiplicity 0..1| |
|CaseEmpty.@action|String|no|name of another action of the process|check for valid action name|
|CaseElse| |yes|CaseElse node, multiplicity 0..1| |
|CaseElse.@action|String|no|name of another action of the process|check for valid action name|

### Example
```
<Case value="Products" action="LoadProducts" />
<Case value="Attachments" action="LoadAttachments" />
<CaseEmpty action="GetInfoTab" />
<CaseElse action="GetInfoTab" />
```

### ParameterizedInputs
The new parameter definition creates a list of parameter-value pairs that are used for multiple printouts with the same base parameter set. One parameter acts as the controller and the dependent parameter is linked to this controlling parameter. Both can have a type which are named parameterType and dependentType.

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|ParameterizedInputs| |no|ParameterizedInputs node, multiplicity 1| |
|ParameterizedInputs@name|String|no|name of ParameterizedInputs| |
|ParameterizedInputs@dependentName|String|yes|dependentName of ParameterizedInputs| |
|ParameterizedInputs.ParameterizedInput| |no|Input node, multiplicity 1..N| |
|ParameterizedInputs.ParameterizedInput@parameterValue|String|no|value of the input parameter|check for valid reference|
|ParameterizedInputs.ParameterizedInput@parameterType|String|yes|type of the input parameter value|check for valid type|
|ParameterizedInputs.ParameterizedInput@dependentValue|String|yes|reference to a ProcessContext / ApplicationContext / Event variable or Literal value|check for valid reference|
|ParameterizedInputs.ParameterizedInput@dependentType|String|yes|type of the input dependent value|check for valid type|

## ExitHandlers
The ExitHandlers element can be used at VIEW actions as well as at the PROCESS itself.


| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|ExitHandlers| |no|ExitHandlers node, multiplicity 1||
|ExitHandlers.ExitHandler| |yes|ExitHandler node, multiplicity 0..N| |
|ExitHandlers.ExitHandler.@handlerName|String|no|name of the exit handler|check for unique name per process|
|ExitHandlers.ExitHandler.@type|String|no|type of the validation exit handler (Validate, ValidateAndSave, CustomValidate)| |
|ExitHandlers.ExitHandler.@name|String|no|reference to a business object variable of the ProcessContext / ApplicationContext|check for valid variable|
|ExitHandlers.ExitHandler.Method| |no|Method node, multiplicity 1..N| |
|ExitHandlers.ExitHandler.Method.@name|String|no|method of the business object specified for the exit handler|check for valid method|
|ExitHandlers.ExitHandler.OnValidationError| |yes|OnValidationError node, mulitplicity 0..1| |
|ExitHandlers.ExitHandler.OnValidationError.@transitionTo|String|no|name of another action of the process|check for valid action|

## Example
```
<ExitHandlers>
  <ExitHandler handlerName="beforeExitCheckMainBo" type="Validate" name="ProcessContext::MainBO">
    <OnValidationError transitionTo="StartNavigation"/>
  </ExitHandler>
  <ExitHandler handlerName ="beforeExitValidateSomething" type="ValidateAndSave" name="ProcessContext::AnotherBO">
    <OnValidationError transitionTo="StartNavigation"/>
  </ExitHandler>
  <ExitHandler handlerName ="beforeExitValidateSomething2" type="CustomValidate" name="ProcessContext::AnotherBO">
    <Method name="validateSimpleProperty1" />
    <Method name="validatePropertyGroupA" />
    <OnValidationError transitionTo="StartNavigation"/>
  </ExitHandler>
</ExitHandlers>
```

## External Events
The ExitHandlers element can be used as PROCESS child element.

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|ExternalEvents| |no|ExtenalEvents node, multiplicity 1|| 
|ExternalEvents.Event| |yes|Event node, multiplicity 0..N| |
|ExternalEvents.Event.@name|String|no|name of event| |
|ExternalEvents.Event.@action|String|no|action of event| |

## Example
```
  <ExternalEvents>
    <Event name="barcodeEvent" action="ScanAndAddProduct_External_StatusDecision" />
  </ExternalEvents>
```

