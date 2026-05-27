# ListObject (LO) Contract Definition

## Description
The List Object Contract specifies the List Objects used in the Mobility Application. A List Object consists of a referenced List Item (containing its Simple Properties), Methods and optionally Advanced Search Objects.

## List Object Contract Defintion
Hierarchical Definition of the Nodes, Attributes and possible Subnodes.

### Root Node (ListObject Node)
### Example
```
<ListObject name="LoMyBpaTEST" simpleEditorOnly="false" generateLoadMethod="false" filter="InDatabase" paging="true" initialLoadPageSize="500" reloadPageSize="100">
  <DataSource name="DsLoMyBpaTEST" />
  <Item objectClass="LiMyBpaTEST" />
  <Methods />
  <AdvancedSearchObjects />
  <NestedListObjects />
</ListObject>
```

### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|simpleEditorOnly|Boolean|yes (default='false')| If this attribute is set to true, the modeler prevents opening in tree editor.This might be necessary as an early adaptor of the modeler to use features of the framework before Editor support is available| none|
|name|String|no|Defines the name of the List Object as well as the name of the JS File generated.|Name needs to be unique for all LOs in the Model|
|generateLoadMethod|Boolean|yes (default='true')|Specifies if a load method should be generated for this LO. If Property is 'False', the customizer|designer has to care for the implementation on his own (in the beforeLoadAsync or afterLoadAsync Method)|
|filter|String|yes|||
|paging|Boolean|yes|Indicator to determine whether the ListObject data should be loaded using paging|Boolean value|
|initialLoadPageSize|Integer|yes (only applicable when paging='true')| Describing the number of records fetched from the SQLite db using the datasource for the first load operation when paging|Integer value|
|reloadPageSize|Integer|yes(only applicable when paging='true')|Describing the number of records fetched from the SQLite db for any further load operations when paging|Integer value|
|lightWeight|String|yes (default = 'false')||allowed values : [false, only, combined]. When lightWeight property is in [only,combined], then - property paging must be 'false' - Advanced search attributes are not  allowed|

### Sub nodes:
* DataSource references to the DataSource that is specified for the List Object
* Item references the assiciated List Item containing the Simple Properties
* Methods contains the methods of the Business Object
* AdvancedSearchObjects contains specifications and profiles to support advanced search options in the application
* NestedListObjects contains references to other list objects including specifications about the reference conditions

#### DataSource Node
Each List Object Contract has exactly one DataSource Node. It defines the relation to the Data Source. The only Attribute of the Data Source Node is the Name of the Data Source.

#### Example
```
<DataSource name="DsLoMyBpaTEST" />
```

#### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|Defines the name of the DataSource|DataSource with this name must exist in the model|

Sub Nodes:
* no Sub Nodes are available

#### Item Node
Each List Object Contract has exactly one DataSource Node. It defines the relation to the Data Source. The only Attribute of the Data Source Node is the Name of the Data Source.

#### Example
```
<Item objectClass="LiMyBpaTEST" />
```

#### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|objectClass|String|no|Defines the name of the List Item|List Item with this name must exist in the model|

Sub Nodes:
* no Sub Nodes are available

#### Methods Node
The Methods Node has no attributes but a list of Method Sub Nodes (0..N)

#### Example
```
<Methods>
  <Method name="beforeSaveAsync" />
  <Method name="afterSaveAsync" />
  <Method name="afterLoadAsync" />
  <Method name="beforeLoadAsync" />
  <Method name="afterDoValidateAsync" />
  <Method name="beforeDoValidateAsync" />
  <Method name="loadAsync" />
  <Method name="saveAsync" />
</Methods>
```

#### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|Defines the name of the Method|A Method with this name must exist in the model and this method has a relation to this LO|

Sub Nodes:
* no Sub Nodes are available

#### AdvancedSearchObjects Node
The AdvancedSearchObjects Node has no attributes but a list of AdvancedSearchObject Sub Nodes (0..N)

#### Example
```
<AdvancedSearchObjects>
    <AdvancedSearchObject name="AsoCustomerOverview">
        <AdvancedSearchAttributes profileId="default">
            <AdvancedSearchAttribute label="Customer_Id" property="customerId" type="Text" />
            <AdvancedSearchAttribute label="Customer_Name" property="name" type="Text" />
            <AdvancedSearchAttribute label="Customer_Street" property="street" type="Text" />
            <AdvancedSearchAttribute label="Customer_ZipCode" property="zipCode" type="Text" />
            <AdvancedSearchAttribute label="Customer_City" property="city" type="Text" />
            <AdvancedSearchAttribute label="Customer_State" property="countryState" type="Selection" toggleId="CountryState" editable="true" />
            <AdvancedSearchAttribute label="Customer_Prio" property="prio" type="Selection" toggleId="ABC" editable="true" />
            <AdvancedSearchAttribute label="Customer_ClassOfTrade" property="classOfTrade" type="Selection" toggleId="BpaClassOfTrade" editable="true" />
            <AdvancedSearchAttribute label="Customer_Substitution" property="substituted" type="Boolean" />
            <AdvancedSearchAttribute label="Customer_TradeOrg" property="tradeOrgPKey" lookupProcess="Customer::CustomerTradeOrgLookupProcess" lookupProcessReturnValue="pKey"                  lookupObject="LuCustomerTradeOrgAdvSearch" lookupObjectDisplayValue="name" type="Lookup" />
        </AdvancedSearchAttributes>
    </AdvancedSearchObject>
</AdvancedSearchObjects>
```

#### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|Defines the name of the Validation|A Method with this name must exist in the model and this method has a relation to this LO|

Sub Nodes:
* AdvancedSearchAttributes

#### AdvancedSearchAttributes Node
The AdvancedSearchAttributes Node has one attribute profileId and a list of AdvancedSearchAttribute Sub Nodes (1..N)

#### Example
```
<AdvancedSearchObject name="AsoCustomerOverview">
    <AdvancedSearchAttributes profileId="default">
        <AdvancedSearchAttribute label="Customer_Id" property="customerId" type="Text" />
    </AdvancedSearchAttributes>
</AdvancedSearchObject>
```

#### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|profileId|String|no|||

#### AdvancedSearchAttribute Node
The AdvancedSearchAttribute Node has multiple attributes describing the Advanced Search layout.

#### Example
```
<AdvancedSearchAttributes profileId="default">
    <AdvancedSearchAttribute label="Customer_Id" property="customerId" type="Text" />
    <AdvancedSearchAttribute label="Customer_Name" property="name" type="Text" />
    <AdvancedSearchAttribute label="Customer_Street" property="street" type="Text" />
    <AdvancedSearchAttribute label="Customer_ZipCode" property="zipCode" type="Text" />
    <AdvancedSearchAttribute label="Customer_City" property="city" type="Text" />
    <AdvancedSearchAttribute label="Customer_State" property="countryState" type="Selection" toggleId="CountryState" editable="true" />
    <AdvancedSearchAttribute label="Customer_Prio" property="prio" type="Selection" toggleId="ABC" editable="true" />
    <AdvancedSearchAttribute label="Customer_ClassOfTrade" property="classOfTrade" type="Selection" toggleId="BpaClassOfTrade" editable="true" />
    <AdvancedSearchAttribute label="Customer_Substitution" property="substituted" type="Boolean" />
    <AdvancedSearchAttribute label="Customer_TradeOrg" property="tradeOrgPKey" lookupProcess="Customer::CustomerTradeOrgLookupProcess" lookupProcessReturnValue="pKey" lookupObject="LuCustomerTradeOrgAdvSearch" lookupObjectDisplayValue="name" type="Lookup" />
</AdvancedSearchAttributes>
```

#### Properties
| name           | Type  | Annotation|
|:---------------|:------|:----------|
|name|String|no|Defines the name of the Validation|A Method with this name must exist in the model and this method has a relation to this LO|
|label|Any String|Identification of this element|
|property|Any SimpleProperty Name|In case of "in memory" search: *List attribute on which search is executed *In case of "in database" search *Name of the conditional parameter|
|type|Possible values: *Boolean, *Date, *Lookup, *Number, *Selection, *Text|Data type of the search property|
|defaultValue|Any String|Default value pre-displayed|
|defaultOperator|See Grid below*|Default operator depending on the value in type|
|toggleId|Any String|Toggle code used to determine possible selection values|
|dataSource|Any valid datasource from the model|The data source used to determine possible selection values|
|call|* ProcessContext::<Object>.<Method>, * ApplicationContext::<Object>.<Method>|BL Method executed to determine possible selection values|
|lookupProcess|Process name, e.g.DeliveryRecipient::LookupProcess|lookup process used to determine available values|
|lookupProcessReturnValue|Process return value, e.g. bpaMainPKey|return value of the specified lookup process|
|lookupObject|Lookup Object name, e.g. LuCustomer|lookup object used by advanced search attribute|
|lookupObjectDisplayValue|Lookup Object display value, e.g.name|display value for the lookup object in advanced search attribute|
|visible|Boolean|Indicates whether this search attribute is visible or not|
|editable|Boolean|Indicates whether this search attribute is editable or not|
|alwaysToday|Boolean|Indicates whether this date type attribute is fixed to the current date|
|dateOffset|Integer|The number of days to add to any given date set for this date type attribute.Negative numbers are subtracted from the date.|
|numberFormat|String|The number format to be used for a number type parameter|
|stepSize|Integer|The step size for the number type parameter|

#### Required and optional properties by parameter type
The following table lists the required and optional attributes depending on the type of the advanced search parameter.

|Property\Type|Boolean|Date|Lookup|Number|Selection|Text|
|:------------|:------|:---|:-----|:-----|:--------|:---|
|label|required|required|required|required|required|required|
|property|required|required|required|required|required|required|
|type|required|required|required|required|required|required|
|defaultValue|optional|optional|optional|optional|optional|optional|
|defaultOperator|optional|optional|optional|optional|optional|optional|
|toggleId|prohibited|prohibited|prohibited|prohibited|Group A: One required|prohibited|
|dataSource|prohibited|prohibited|prohibited|prohibited|Group A: One required|prohibited|
|call|prohibited|prohibited|prohibited|prohibited|Group A: One required|prohibited|
|lookupProcess|prohibited|prohibited|required|prohibited|prohibited|prohibited|
|lookupProcessReturnValue|prohibited|prohibited|required|prohibited|prohibited|prohibited|
|lookupObject|prohibited|prohibited|required|prohibited|prohibited|prohibited|
|lookupObjectDisplayValue|prohibited|prohibited|required|prohibited|prohibited|prohibited|
|Parameters/Input|prohibited|prohibited|optional|prohibited|prohibited|prohibited|
|visible|optional|optional|optional|optional|optional|optional|
|editable|optional|optional|optional|optional|optional|optional|
|alwaysToday|prohibited|optional|prohibited|prohibited|prohibited|prohibited|
|dateOffset|prohibited|optional|prohibited|prohibited|prohibited|prohibited|
|numberFormat|prohibited|prohibited|prohibited|optional|prohibited|prohibited|
|stepSize|prohibited|prohibited|prohibited|optional|prohibited|prohibited|

#### AdvancedSearchAttribute DefaultValue macros
The following makros can be used as default values where applicable:
|Macro|Meaning|
|:----|:------|
|#SalesOrg#|Sales organisation of currently logged in user|
|#Language#|Language of currently logged in user|
|#Client#|Client id of currently logged in user|
|#UserPKey#|PKey of currently logged in user|
|#Today#|Current date without time|
|#MaxDate#|System wide maximum date|
|#MinDate#|System wide minimum date|
|#Now#|Current date and time|

#### AdvancedSearchAttribute Comparators
|Search field type| Operator| Meaning|
|:----------------|:--------|:-------|
|Text|CT|Contains|
||CN|Contains not|
||EQ|Equals|
||NE|Not equals|
||LT|Smaller|
||GT|Greater|
|Number|EQ|Equals|
||NE|Not equals|
||LT|Smaller|
||GT|Greater|
|Date|EQ|Is|
||NE|Is not|
||LT|Before|
||GT|After|
|Selection|EQ|Is|
||NE|Is not|
|Lookup|EQ|Is|
||NE|Is not|

Sub Nodes:
* For Lookup Objects one Parameters Node can exist

#### Parameters
The Parameters element is applicable for Type Lookup It describes the parameters passed to a certain Process.

|Node/Atttribute Name|Type|Optional|Description/Annotation|Validations/Checks|
|:-------------------|:---|:-------|:---------------------|:-----------------|
|Parameters||no|Parameters node, multiplicity 1||
|Parameters.Input||no|Input node, multiplicity 1..N||
|Parameters.Input.@name||no|name of the input parameter|check for unique parameter name|
|Parameters.Input.@type||yes|type of the input parameter: <ul><li>applicable for unbound variables only ("Literal") <li>not used for all referenced variables from ProcessContext</ul> / ApplicationContext|check for valid type|
Parameters.Input.@value||no|reference to a ProcessContext / ApplicationContext / Event variable or Literal value|check for valid reference?|

#### Example
```
<Parameters>
  <Input name="metaType" type="Literal" value="ContractPayment" />      
</Parameters>
```

#### NestedListObjects Node
The NestedListObjects Node has no attributes but a list of ListObject Sub Nodes (0..N)

(warning) The NestedListObjects definition must match between the ListObject and its ListItem.

Representation in the Contract:

#### Example
```
<NestedListObjects>
  <ListObject name="nestedLO" objectClass="LoNestedList" parentReferenceProperty="pKey" nestedReferenceProperty="refPKey">
     <Events>
       <Event name="listItemChanged" eventHandler="onNestedLiChanged" />
     </Events>
  </ListObject>
</NestedListObjects>
```

##### Properties of the ListObject Node:
|Attribute Name|Type|optional|Annotation|Validations/Checks|
|:-------------|:---|:-------|:---------|:-----------------|
|name|String|no|Defines the name of the reference to the nested ListObject|Name must be unique for this LO|
|objectClass|String|no|Defines the Type of the nested ListObject. Important for Validations and Constistency Checks.|Must be a valid LO of the model|
|parentReferenceProperty|String|no|This Property is used as input to load the nested ListObject|parentReferenceProperty is available as Simple Property of the ListObject / ListItem|
|nestedReferenceProperty|String|no|This Property is used to load the nested ListObject|nestedReferenceProperty is available as SimpleProperty of the nested ListObject/ ListItem|

##### Sub Nodes:
* Events Node
The Events node is optional and contains exactly one "Event" Subnode.

#### Example
```
<Events>
  <Event name="listItemChanged" eventHandler="onNestedLiChanged" />
</Events>
```
##### Properties of a Event Node
|Name|Type|optional|Annotation|Validations/Checks|
|:---|:---|:-------|:---------|:-----------------|
|name|String|no|Fixed "listItemChanged" for nested ListObject Events|Event name must be unique for this|
|eventHandler|String|no|Defines the Method which should be called if the value of the simple property changes|Must be part of the defined Methods of this LO|

##### Sub Nodes:
* An Event Node has no further Subnodes

## Example Contract
### List Object
```
<ListObject name="LoMyBpaMED" simpleEditorOnly="false" generateLoadMethod="false" filter="InDatabase" paging="true">
  <DataSource name="DsLoMyBpaMED" />
  <Item objectClass="LiMyBpaMED" />
  <Methods>
    <Method name="beforeSaveAsync" />
    <Method name="afterSaveAsync" />
    <Method name="afterLoadAsync" />
    <Method name="beforeLoadAsync" />
    <Method name="afterDoValidateAsync" />
    <Method name="beforeDoValidateAsync" />
    <Method name="loadAsync" />
    <Method name="saveAsync" />
    <Method name="onNestedLiChanged" />
  </Methods>
   <AdvancedSearchObjects>
    <AdvancedSearchObject name="AsoMyBpaMED">
      <AdvancedSearchAttributes profileId="default">
        <AdvancedSearchAttribute label="Customer_Id" property="customerId" type="Text" />
        <AdvancedSearchAttribute label="Customer_Name" property="name" type="Text" />
        <AdvancedSearchAttribute label="Customer_Street" property="street" type="Text" />
        <AdvancedSearchAttribute label="Customer_ZipCode" property="zipCode" type="Text" />
        <AdvancedSearchAttribute label="Customer_City" property="city" type="Text" />
        <AdvancedSearchAttribute label="Customer_State" property="countryState" type="Selection" toggleId="CountryState" editable="true" />
        <AdvancedSearchAttribute label="Customer_Prio" property="prio" type="Selection" toggleId="ABC" editable="true" />
        <AdvancedSearchAttribute label="Customer_ClassOfTrade" property="classOfTrade" type="Selection" toggleId="BpaClassOfTrade" editable="true" />
        <AdvancedSearchAttribute label="Customer_Substitution" property="substituted" type="Boolean" />
        <AdvancedSearchAttribute label="Customer_TradeOrg" property="tradeOrgPKey" lookupProcess="Customer::CustomerTradeOrgLookupProcess" lookupProcessReturnValue="pKey" lookupObject="LuCustomerTradeOrgAdvSearch" lookupObjectDisplayValue="name" type="Lookup" />
      </AdvancedSearchAttributes>
    </AdvancedSearchObject>
  </AdvancedSearchObjects>
  <NestedListObjects>
    <ListObject name="nestedLO" objectClass="LoNestedList" parentReferenceProperty="pKey" nestedReferenceProperty="refPKey">
       <Events>
         <Event name="listItemChanged" eventHandler="onNestedLiChanged" />
       </Events>
    </ListObject>
  </NestedListObjects>
</ListObject>
```