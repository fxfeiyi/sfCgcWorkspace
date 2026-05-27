# Business Object (BO) Contract Definition

## Description
The Business Object Contract specifies the Business Objects used in the Mobility Application.

### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|simpleEditorOnly|Boolean|yes (default='false')| If this attribute is set to true, the modeler prevents opening in tree editor. This might be necessary as an early adaptor of the modeler to use features of the framework before Editor support is available |none|
|name|String|no|Defines the name of the Business Object as well as the name of the JS File generated.| Name needs to be unique for all BOs in the Model|
|generateLoadMethod|Boolean|yes (default='true')|Specifies if a load method should be generated for this BO. If Property is 'False', the customizer|designer has to care for the implementation on his own (in the beforeLoadAsync or afterLoadAsync Method)||
|generateCreateMethod|Boolean|yes (default='true')|Specifies if a create method should be generated for this BO. If Property is 'False', the customizer|designer has to care for the implementation on his own (in the beforeLoadAsync or afterLoadAsync Method)||
|baseClass|String|yes|comboBox values: "FrameworkUser" or "[empty]".||
|platformObject|String|yes|Defines the name of the corresponding sObject from the platform. This has to be specified if object specific LWC Quickactions should be displayed for this BO.|You can reference only 5 unique platform objects in your model.<br>If a platformObject is specified two additional Validations are applied to the BO Contract:<ul><li>simpleProperty recordTypeId is optional, but when defined it should be of type DomId</li><li>You must set one simple property as id in a platformObject element.</li></ul>|

### Examples
```
<BusinessObject name="BoOrder" generateLoadMethod="false" generateCreateMethod="false">

<!-- Example for BusinessObject which should display object specific LWC QuickActions: -->
<BusinessObject name="BoOrder" generateLoadMethod="false" generateCreateMethod="false" platformObject="Order">
  <SimpleProperties>
    <SimpleProperty name="pKey" type="DomPKey" id="true" dataSourceProperty="pKey" />
    <SimpleProperty name="recordTypeId" type="DomId" dataSourceProperty="recordTypeId" />
```
## Sections inside the BO contract
### DataSource
Each BusinessObject Contract has exactly one DataSource Node. It defines the relation to the Data Source. The only Attribute of the Data Source Node is the Name of the Data Source. 
#### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|Defines the name of the DataSource|DataSource with this name must exist in the model|

#### Example
```
<DataSource name="DsBoOrder" />
```

### SimpleProperties
SimpleProperties contains a list of Simple Properties (1..N) of the Business Object. The SimpleProperties Node does not have any attributes, but it has a list of SimpleProperty SubNodes.
#### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|Defines the name of the Simple Property|Must be unique in the List of simple Properties, nested Objects, nested Lookup, nested List Objects, Methods and Validations.|
|type|Name of a Domain or JavaScript Type (Boolean, Sting, Object,...)|no|Defines the Type of the Simple Property. Important for Validations and Constistency Checks.|Must be in the List of Domain Names or in a list of reserved JS Types.|
|id|Boolean|no|One of the Simple Properities has to be defined as id Property|Exactly one of the Simple Properties needs to be specified as ID Property|
|dataSourceProperty|String (List of DataSource.Attributes.Attribute.@name / DataSource.Attributes.PivotItems.PivotItem.Attribute.@name / DataSource.Attributes.PivotItems.PivotItem.PivotConstant.@name / DataSource.Attributes.PivotItems.PivotItem.PivotDerivedAttribute.@name / DataSource.Attributes.PivotItems.PivotItem.DateTimeAttribute.@dateName / DataSource.Attributes.PivotItems.PivotItem.DateTimeAttribute.@timeName / of the specified DataSource)|no|In current Contracts many Simple Properties are defined without valid dataSourceProperties (Attribute exists but content not valid)|DataSourceProperty must exist in the List of Attributes of the DataSource. Types must match|
|nullable|Boolean|yes| ability to specify emtpy nubmers| if true, must match related column in dbTable contract|
|blobPkeyField|String|yes||if set, depending property:blobTable|
|blobTable|String|yes||if set, depending property: blobPKeyField|


```
<SimpleProperty name="orderId" type="DomId" id="true" dataSourceProperty="orderId" />
<SimpleProperty name="commitDate" type="DomDate" dataSourceProperty="commitDate" />
```

#### Events [optional]
The Events node is optional and contains exactly one "Event" Subnode.

##### Event
An Event Node has no further Subnodes
###### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|Fixed "onChanged" for simpleProperty Events|Fixed "onChanged" for simpleProperty Events|
|eventHandler|String|no|Defines the Method whoch should be called if the value of the simple property changes|Must be part of the defined Methods of this BO|

```
<SimpleProperty name="deliveryDate" type="DomDate" dataSourceProperty="deliveryDate">
    <Events>
        <Event name="onChanged" eventHandler="onHeaderDeliveryDateChanged" />
    </Events>
</SimpleProperty>

```

### NestedObjects
NestedObjects contains a list of nested Business Objects(0..N) of the Business Object. The NestedObjects Node does not have any attributes, but it has a list of NestedObject SubNodes.
#### NestedObject
A NestedObject Node has no further Subnodes
##### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|Defines the name of the nested Business Object|Must be unique in the List of simple Properties, nested Objects, nested Lookup, nested List Objects, Methods and Validations.|
|objectClass|Name of the referenced BusinessObject|no|Defines the Type of the Business Object. Important for Validations and Constistency Checks|Must be in the List of Business Objects Names|
|dataSourceProperty|String (List of Simple Properties of the BO)|no|This Property is used as input to load the nested Busienss Object|dataSourceProperty is available as Simple Property of the Business Object|
|nestingProperty|String (List of Simple Properties of the nested Business Object)|no|This Property is used to load the nested Business Object|nestingProperty is available as SimpleProperty of the nested Business Object|

##### Example
```
<NestedObjects>
    <NestedObject name="hurdleEvaluationHelper" objectClass="BoHurdleEvaluationHelper" dataSourceProperty="empty" nestingProperty="empty" />
</NestedObjects>
```
### ObjectLookups
ObjectLookups contains a list of Object Lookups (0..N) of the Business Object. The ObjectLookups Node does not have any attributes, but it has a list of ObjectLookup SubNodes.
#### ObjectLookup
A ObjectLookup Node has no further Subnodes
##### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|Defines the name of the nested Object Lookup|Must be unique in the List of simple Properties, nested Objects, nested Lookup, nested List Objects, Methods and Validations.|
|objectClass|Name of the referenced LookupObjects|no|Defines the Type of the LookupObjects. Important for Validations and Constistency Checks.|Must be in the List of Lookup Objects Names|
|dataSourceProperty|String (List of Simple Properties of the BO)|no|This Property is used as input to load the Lookup Object|dataSourceProperty is available as Simple Property of the Business Object|
|lookupProperty|String (List of Simple Properties of the nested Lookup Object)|no|This Property is used to load the Lookup Object|lookupProperty is available as SimpleProperty of the nested Lookup Object|
##### Example
```
<ObjectLookups>
    <ObjectLookup name="luOrderer" objectClass="LuOrderer" dataSourceProperty="ordererPKey" lookupProperty="pKey" />
</ObjectLookups>
```
### ListObjects
ListObjects contains a list of nested List Objects(0..N) of the Business Object. The ListObjects Node does not have any attributes, but it has a list of ListObject SubNodes.
#### ListObject
Can have a subnode of Events
##### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|Defines the name of the nested List Object|Must be unique in the List of simple Properties, nested Objects, nested Lookup, nested List Objects, Methods and Validations.|
|objectClass|Name of the referenced ListObject|no|Defines the Type of the List Object. Important for Validations and Constistency Checks.|Must be in the List of List Objects Names|
|dataSourceProperty|String (List of Simple Properties of the BO)|no|This Property is used as input to load the ListObject|dataSourceProperty is available as Simple Property of the Business Object|
|listProperty|String (List of Simple Properties of the nested ListObject/ ListItem)|no|This Property is used to load the List Object|listProperty is available as SimpleProperty of the nested ListObject/ ListItem|

##### Example
```
  <ListObjects>
    <ListObject name="LoItems" objectClass="LoOrderItems" dataSourceProperty="pKey" listProperty="sdoMainPKey" />
  </ListObjects>
```

##### Events [optional]
The Events node is optional and contains exactly one "Event" Subnode.

###### Event
An Event Node has no further Subnodes
###### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|Fixed "listItemChanged" for ListObejct Events|Fixed "listItemChanged" for ListObejct Events|
|eventHandler|String|no|Defines the Method whoch should be called if an Item of this List Object changes|Must be part of the defined Methods of this BO|

##### Example
```
<Events>
    <Event name="listItemChanged" eventHandler="onNotesChanged" />
</Events>
```


### Validations [optional]
The Validations Node has no attributes but a list of Validation Sub Nodes (0..N)

#### Validation
No Sub Nodes are available

##### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|Defines the name of the Validation|A Method with this name must exist in the model and this method has a relation to this BO|

##### Example
```
  <Validations>
    <Validation name="validateOrderValue" />
  </Validations>
```

### Methods 
The Methods Node has no attributes but a list of Method Sub Nodes (0..N)
#### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|Defines the name of the Method|A Method with this name must exist in the model and this method has a relation to this BO|

#### Example
```
  <Methods>
    <Method name="beforeSaveAsync" />
    <Method name="afterSaveAsync" />
    <Method name="beforeLoadAsync" />
    <Method name="afterLoadAsync" />
    <Method name="beforeInitialize" />
    <Method name="afterInitialize" />
    <Method name="beforeDoValidateAsync" />
    <Method name="afterDoValidateAsync" />
    <Method name="beforeCreateAsync" />
    <Method name="afterCreateAsync" />
    <Method name="loadAsync" />
    <Method name="saveAsync" />
    <Method name="createAsync" />
  </Methods>
```