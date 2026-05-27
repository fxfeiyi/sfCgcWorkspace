# ListItem (LI) Contract Definition

## Description
Hierarchical Definition of the Nodes, Attributes and possible Subnodes.

### Root Node (ListItem Node)
### Example
```
<ListItem name="LiMyBpaTEST">
  <SimpleProperties />
  <NestedListObjects />
</ListItem>
```

### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|simpleEditorOnly|Boolean|yes (default='false')| Not used anymore. Was used in Web based modeler: If this attribute is set to true, the modeler prevents opening in tree editor. This might be necessary as an early adaptor of the modeler to use features of the framework before Editor support is available| none|
|name|String|no|Defines the name of the List Item as well as the name of the JS File generated. |Name needs to be unique for all LIs in the Model|

### Sub nodes:
* SimpleProperties contains all Simple Properties of the List Object
* NestedListObjects contains all nested ListObjects of the List Object

#### SimpleProperties Node
SimpleProperties contains a list of Simple Properties (1..N) of the List Item. The SimpleProperties Node does not have any attributes, but it has a list of SimpleProperty SubNodes.

#### Example
```
<SimpleProperties>
  <SimpleProperty id="true" name="pKey" type="DomPKey" dataSourceProperty="pKey" />
  <SimpleProperty name="name" type="DomBpaName" dataSourceProperty="name" />
  <SimpleProperty name="customerId" type="DomId" dataSourceProperty="customerId" />
  <SimpleProperty name="mainAddress" type="DomText" dataSourceProperty="mainAddress" />
  <SimpleProperty name="street" type="DomText" dataSourceProperty="street" />
  <SimpleProperty name="zipCode" type="DomText" dataSourceProperty="zipCode" />
  <SimpleProperty name="city" type="DomText" dataSourceProperty="city" />
  <SimpleProperty name="countryState" type="DomText" dataSourceProperty="countryState" />
  <SimpleProperty name="prio" type="DomText" dataSourceProperty="prio" />
  <SimpleProperty name="classOfTrade" type="DomText" dataSourceProperty="classOfTrade" />
  <SimpleProperty name="tradeOrg" type="DomText" dataSourceProperty="tradeOrg" />
  <SimpleProperty name="tradeOrgPKey" type="DomText" dataSourceProperty="tradeOrgPKey" />
  <SimpleProperty name="grouping1" type="DomText" dataSourceProperty="grouping1" />
  <SimpleProperty name="substitutedUsrPKey" type="DomPKey" dataSourceProperty="substitutedUsrPKey" />
  <SimpleProperty name="subValidFrom" type="DomDate" dataSourceProperty="subValidFrom" />
  <SimpleProperty name="subValidThru" type="DomValidThru" dataSourceProperty="subValidThru" />
  <SimpleProperty name="substituted" type="DomBool" dataSourceProperty="isSubstituted" />
  <SimpleProperty name="managed" type="DomBool" dataSourceProperty="managed" />
</SimpleProperties>
```

#### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|Defines the name of the Simple Property|Must be unique in the List of simple Properties, (Methods and Validations?!?)|
|type|Name of a Domain or JavaScript Type (Boolean, Sting, Object,...)|no|Defines the Type of the Simple Property. Important for Validations and Constistency Checks.|Must be in the List of Domain Names or in a list of reserved JS Types.|
|id|Boolean|no|One of the Simple Properities has to be defined as id Property|Exactly one of the Simple Properties needs to be specified as ID Property|
|dataSourceProperty|String (List of DataSource Attributes of the specified DataSource)|?|In current Contracts many Simple Properties are defined without valid dataSourceProperties (Attribute exists but content not valid)|DataSourceProperty must exist in the List of Attributes of the DataSource. Types must match|
|blobTable|String|yes|||
|blobPKeyField|String|yes|||
|nullable|Boolean|yes|ability to specify empty numbers|if true, must mach related column in dbTable contract|

Sub Nodes:
* no Sub Nodes are available

#### NestedListObjects Node
The NestedListObjects Node has no attributes but a list of ListObject Sub Nodes (0..N)

(warning) The NestedListObjects definition must match between the ListObject and its ListItem.

#### Example
```
<NestedListObjects>
  <ListObject name="nestedLO" objectClass="LoNestedList" />
</NestedListObjects>
```

#### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|Defines the name of the reference to the nested ListObject|Name must be unique for this LO|
|objectClass|String|no|Defines the Type of the nested ListObject. Important for Validations and Constistency Checks.|Must be a valid LO of the model|

Sub Nodes:
* no Sub Nodes are available

## Example Contract List Item
```
<ListItem name="LiMyBpaTEST">
  <SimpleProperties>
    <SimpleProperty id="true" name="pKey" type="DomPKey" dataSourceProperty="pKey" />
    <SimpleProperty name="name" type="DomBpaName" dataSourceProperty="name" />
    <SimpleProperty name="customerId" type="DomId" dataSourceProperty="customerId" />
    <SimpleProperty name="mainAddress" type="DomText" dataSourceProperty="mainAddress" />
    <SimpleProperty name="street" type="DomText" dataSourceProperty="street" />
    <SimpleProperty name="zipCode" type="DomText" dataSourceProperty="zipCode" />
    <SimpleProperty name="city" type="DomText" dataSourceProperty="city" />
    <SimpleProperty name="countryState" type="DomText" dataSourceProperty="countryState" />
    <SimpleProperty name="prio" type="DomText" dataSourceProperty="prio" />
    <SimpleProperty name="classOfTrade" type="DomText" dataSourceProperty="classOfTrade" />
    <SimpleProperty name="tradeOrg" type="DomText" dataSourceProperty="tradeOrg" />
    <SimpleProperty name="tradeOrgPKey" type="DomText" dataSourceProperty="tradeOrgPKey" />
    <SimpleProperty name="grouping1" type="DomText" dataSourceProperty="grouping1" />
    <SimpleProperty name="substitutedUsrPKey" type="DomPKey" dataSourceProperty="substitutedUsrPKey" />
    <SimpleProperty name="subValidFrom" type="DomDate" dataSourceProperty="subValidFrom" />
    <SimpleProperty name="subValidThru" type="DomValidThru" dataSourceProperty="subValidThru" />
    <SimpleProperty name="substituted" type="DomBool" dataSourceProperty="isSubstituted" />
    <SimpleProperty name="managed" type="DomBool" dataSourceProperty="managed" />
  </SimpleProperties>
  <NestedListObjects>
    <ListObject name="nestedLO" objectClass="LoNestedList" />
  </NestedListObjects>
</ListItem>
```
