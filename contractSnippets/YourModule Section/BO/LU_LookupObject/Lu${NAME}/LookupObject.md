# LookupObject (LU) Contract Definition

## Description
The Lookup Contract specifies the Lookups used in Business Objects of the Mobility Application.
A Lookup consists of Simple Properties and Methods.

## Contract Defintion
Hierarchical Definition of the Nodes, Attribtues and possible Subnodes

### Root Node (ListItem Node)
### Example
```
<LookupObject name="LuCustomerManagementInfo" generateLoadMethod="true" >
 <DataSource name="DsLuProductInformation" />
 <SimpleProperties/> 
 <Methods />
</LookupObject>
```

### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|simpleEditorOnly|Boolean|yes (default='false')| Not used anymore. Was used in Web based modeler: If this attribute is set to true, the modeler prevents opening in tree editor. This might be necessary as an early adaptor of the modeler to use features of the framework before Editor support is available| none|
|name|String|no|Defines the name of the Lookup Object as well as the name of the JS File generated.|Name needs to be unique for all Lookups in the Model|
|generateLoadMethod|Boolean|yes (default='true')|Specifies if a load method should be generated for this Lookup. If Property is 'False', the customizer|designer has to care for the implementation on his own (in the beforeLoadAsync or afterLoadAsync Method)||

### Sub nodes:
* DataSource references to the DataSource that is specified for the Lookup
* SimpleProperties contains all Simple Properties of the Lookup
* Methods contains the methods of the Lookup

#### DataSource Node
Each Lookup Contract has exactly one DataSource Node. It defines the relation to the Data Source. The only Attribute of the Data Source Node is the Name of the Data Source.

#### Example
```
<DataSource name="DsLuMyBpaTEST" />
```

#### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|Defines the name of the DataSource|DataSource with this name must exist in the model|

#### Sub Nodes:
* no Sub Nodes are available

#### SimpleProperties Node
SimpleProperties contains a list of Simple Properties (1..N) of the Lookup. The SimpleProperties Node does not have any attributes, but it has a list of SimpleProperty SubNodes.

#### Example
```
<SimpleProperties>
    <SimpleProperty id="true" name="pKey" type="DomPKey" dataSourceProperty="pKey" />
    <SimpleProperty name="isManaged" type="DomBool" dataSourceProperty="isManaged" />
    <SimpleProperty name="isSubstituted" type="DomBool" dataSourceProperty="isSubstituted" />
    <SimpleProperty name="subMainUsrMainPKey" type="DomPKey" dataSourceProperty="subMainUsrMainPKey" />
    <SimpleProperty name="subMainUsrName" type="DomString" dataSourceProperty="subMainUsrName" />
    <SimpleProperty name="subValidFrom" type="DomDate" dataSourceProperty="subValidFrom" />
    <SimpleProperty name="subValidThru" type="DomDate" dataSourceProperty="subValidThru" />
</SimpleProperties>
```

#### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|Defines the name of the Simple Property|Must be unique in the List of simple Properties, (Methods and Validations?!?)|
|type|Name of a Domain or JavaScript Type (Boolean, Sting, Object,...)|no|Defines the Type of the Simple Property. Important for Validations and Constistency Checks.|Must be in the List of Domain Names or in a list of reserved JS Types.|
|id|Boolean|yes|Maximum one simple property has ID=True|Maximum one simple property has ID=True|
|dataSourceProperty|String (List of DataSource Attributes of the specified DataSource)|?|In current Contracts many Simple Properties are defined without valid dataSourceProperties (Attribute exists but content not valid)|DataSourceProperty must exist in the List of Attributes of the DataSource. Types must match|
|nullable|Boolean|yes|ability to specify empty numbers|if true, must mach related column in dbTable contract|

#### Sub Nodes:
* no Sub Nodes are available

#### Methods Node
The Methods Node has no attributes but a list of Method Sub Nodes (0..N)

#### Example
```
<Methods>
    <Method name="afterLoadAsync" />
    <Method name="beforeLoadAsync" />
    <Method name="loadAsync" />
</Methods>
```

#### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|Defines the name of the Method|A Method with this name must exist in the model and this method has a relation to this Lookup|


#### Sub Nodes:
* no Sub Nodes are available


