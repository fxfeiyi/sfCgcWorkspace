# Validation Message Contract Definition
## Description
A validation messages contract holds all of the validation messages for a particular business object. There is one validation message contract per business object.For example, the validation message contract for the Order business object is called BO_Order_ValidationMessages. Individual validation messages in the validation messages contract can be called from Validate methods (business logic contracts).  Each validation message can be referenced via its name. In the Validate method, the "messageID" refers to the value of the "name" attribute of the validation message.

## Validation Message Contract Definition
Hierarchical Definition of the Nodes, Attributes and possible Subnodes.

### Root Node (ValidationMessages Node)
#### Example
```
<ValidationMessages name="BoCallMessages" businessObject="BoCall" schemaVersion="0.0.0.5">  
  <ValidationMessage name="CasClbRemainingOpenOrders" defaultMessage="Validation notification! There are still open orders!" comment=" " />  
  <ValidationMessage name="CasClbNotAllMandatoryStoreSurveysAnswered" defaultMessage="Validation notification! Not all mandatory store surveys are answered! #questions#" comment=" " />  
  ...
</ValidationMessages>
```
#### Parameters:
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|The name used to identify the validation messages||
|businessObject|String|no|Name of the businessobject, the messages are related to||
|schemaVersion|String|no|Version of the design contract||
 
#### Sub Nodes:

##### ValidationMessage
Every <Validationmessages> node contains 1..n <Validationmessage> childnodes

#### ValidationMessage Node
This node describes a single validaiton message

##### Parameters:
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|The name used to identify a single validation message|name must be unique for the contract|
|defaultMessage|String|no|The default message that will be displayed if there is no applicable translation||
|comment|String|yes|A comment that is only visible to the custimizer who looks at the conract in the modeler||

