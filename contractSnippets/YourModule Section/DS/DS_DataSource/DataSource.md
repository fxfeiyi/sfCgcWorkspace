# DataSource (DS) Contract Definition

## Table of Content
- [Description](#description)
- [Attribute Section](#attributes)
  - [Standard Attribute](#attribute-most-common)
  - [Derivied Attribute](#derivedattribute)
  - [DateTime Attribute](#datetimeattribute)
  - [PivotItems (rarely used)](#pivotitems)
- [Entity Section](#entities)
  - [Join](#join)
  - [SimpleJoin](#simplejoin-condition)
  - [ComplexJoin](#complexjoin-condition)
- [QueryCondition Section](#querycondition)
- [OrderCriteria Section](#orderciteria)
- [GroupBy Section](#groupby)
- [Macros](#macros)
  - [Framework Macros](#framework-macros)
  - [Parameter Macros](#parameter-macros)

## Description
DataSource Contracts are design time artifacts describing a common way for data access and manipulation of existing enterprise information system.
The main goal of this document is to have a common understanding of the different elements that constitute a definition of a DataSource Contract.

## Contracts Elements
The following sections describe all elements that could be find in a definition of a DataSource Contract. The DataSource Node has the following Parameters

## Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|Name of the Data Source||
|businessObjectClass|String|no|Name of the assigned BO||
|external|Boolean|yes|external DataSources provide Javascript Methods to build the Select, Update, Insert or Delete Statements|True|
|editableEntity|String|yes|	contains the name of the editable Entity (for editable DataSources relevant only)||
|distinct|Boolean|yes|specifies if a Distinct Select Statement is generated|False| 
|readOnly|Boolean|yes|specifies if the Update, Delete and Insert Statements are generated|False|
|schemaVersion|String|no|Version of the design contract.||	 
|backendSystem|String|no|specifies the target Backend System of the Data Source. Currently only sf is allowed|sf|

### Attributes
Attributes contains a list of Attributes (1..N) of the Datasource. The <Attributes> node does not have any attributes itself, but it has a list of <Attribute> SubNodes. The DS Attributes are mapped to the Business Objects Simple Properties. There are four types of supported attribute nodes

#### Attribute (most common)
#### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|Name of the Attribute||
|table|String|no|Name of the assigned table||
|column|String|no|Name of the assigned column||

#### DerivedAttribute
#### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|Name of the Attribute||	 
|value|String|no|value of derived attribute||	
 
#### DateTimeAttribute
#### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|dateName|String|no|||	 
|timeName|String|no|||	
|table|String|no|Name of the assigned table||	 
|column|String|no|Name of the assigned column||

#### PivotItems
Can have multiple PovotItem elements
PivotItems does not have any parameter. Only the node name

### Example
```
  <PivotItems>
  <!-- Delivery Recipient Role-->
  <PivotItem id="deliveryrecipient">
    <Attribute name="customerPKey" table="Account_Extension__c" column="Account__c" />
    <Attribute name="validThru" table="Account_Extension__c" column="Delivery_Role_Valid_Thru__c" />
    <Attribute name="validFrom" table="Account_Extension__c" column="Delivery_Role_Valid_From__c" />
    <PivotConstant name="salesOrg" value="'#SalesOrg#'" />
    <PivotConstant name="bpaRoleMetaPKey" value="' '" />
    <PivotDerivedAttribute name="category" pivotName="deliveryRoleCategory" value="CASE WHEN #compareAsDate('Delivery_Role_Valid_From__c', 'Date','le',#TodayAsDate#, 'Date')#  AND #compareAsDate('Delivery_Role_Valid_Thru__c', 'Date','ge',#TodayAsDate#, 'Date')# THEN 'deliveryrecipient' ELSE ' ' END" />
  </PivotItem>
```

##### PivotItem
Contains a list of Attributes (1..N) of the datasource. Does also support PivotConstant and PivotDerivedAttribute

##### Attribute
##### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|Name of the Attribute||
|table|String|no|Name of the assigned table||
|column|String|no|Name of the assigned column||

##### PivotConstant
##### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|Name of the Attribute||
|value|String|value or macro in single quots||

##### PivotDerivedAttribute
##### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|Name of the Attribute||
|pivotName|String|no|Pivot name of the attribute||
|value|String|no|formula in sql language||

### Entities
Entities contains a list of Entities (1..N) of the Datasource. The <Entities> node does not have any attributes itself, but it has a list of <Entity> SubNodes. The Entities specify the Database Table where the Data is collected from. Only one of the Entities can be stored (R10 restriction). Each entity except the Start Entity has a JOIN Condition

### Example
```
  <Entities>
    <Entity name="Order__c" alias="" idAttribute="Id" />
    <Entity name="Order_Template__c" alias="">
      <Join Type="inner">
        <SimpleJoin>
          <Condition leftSideValue="Order_Template__c.Id" comparator="eq" rightSideType="Attribute" rightSideValue="Order__c.Order_Template__c" />
        </SimpleJoin>
      </Join>
    </Entity>
  </Entities>
```

#### Entity
#### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|Name of the Entity||	 
|alias|String|yes|Alias name of the entity||
|idAttribute|String|yes|Literal	unique key row of entity||

##### Join
Join describes the join type between two entities (inner, left ,left outer)
##### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|type|String|no|Could have the values inner, left, left outer||

###### SimpleJoin condition
one ore more  modeled  relations between entities

###### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|leftSideValue|String|no|||	 
|comparator|String|no|||	 
|rightSideType|String|no|Attribute, Parameter or Literal||
|rightSideValue|String|no|||	 

###### ComplexJoin condition
describes a relation between entities with a SQL code snippet. Complex Join nodes contain only a CDATA section with the SQL code.

###### Example 
```
<Join Type="inner">
  <ComplexJoin><![CDATA[
      PrdSales.#criterionAttribute# = PrdGroup.Id #addCond_criterionFilterValue#
      ]]></ComplexJoin>
</Join>
```

###### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|<![CDATA[Your join condition to be enter here]]>|String|no|||

### QueryCondition
Each Data Source has one Query Condition. The Query Condition is a SQL Snippet which is pasted by the Generator into the WHERE Part of the Select Statement. A Query Condition can contain Parameters which are defined for the Data Source

### Example
```
<QueryCondition><![CDATA[
      PrdSales.SalesSegmentState = '4'
          AND PrdProduct.State='4'
          AND CndMain.ValidFrom <= '#commitDate#'
          AND CndMain.ValidThru >= '#commitDate#'      
      AND CndMain.PriceType = CndMain.DefaultPriceType
      AND CndMain.PriceListType = CndMain.DefaultPriceListType
      AND CndMain.MetaId = 'ProductPrice'       
          #addCond_FieldState#
          #addCond_NewState#
          #addCond_ForeignProduct#
  ]]></QueryCondition>
  ```

### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|<![CDATA[Your where condition to be enter here]]>|String|no|||


### OrderCiteria
describes the sort order of the query result set

### Example
```
  <OrderCriteria>
    <OrderCriterion entity="Order__c" attribute="Order_Id__c" direction="ASC" />
  </OrderCriteria>
```

### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|entity|String|no|||	 
|attribute|String|no|||	 
|direction|String|no|||	

### GroupBy
The GroupBy element defines the Attributes and their order which are used to create the Group By Clause of the Select Statement. Each GroupByCriterion must define the following attribues.

### Example
```
  <GroupBy>
    <GroupByCriterion entity="Visit_Job__c" attribute="Product__c" />
  </GroupBy>
```

### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|entity|String|no|Name of the Entity for the Group By Criterion||	 
|attribute|String|no|Name of the Attribute for the Group By Criterion||

### Parameters
Parameters are modeled and can be used in the JOIN and the QUERY Conditions to filter the Result Set

### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|||	 
|baseType|String|yes|Date, Time or DateTime||
|type|String|yes|SQLite type (NULL, INTEGER, REAL, TEXT, LIST)||
|treatAs|String|yes|can be set to "sqlSnippet" to include the parameter directly into the statement (not as parameter)||

Type "LIST" is used for parameters used in "IN" conditions. All items of the list (Array or comma separated list in a string) must be the same type (string or numeric).

### Macros
Macros are shortcuts used in the SQL-Statements that are replaced at runtime. There are framework macros that represent frequently used parameters and default parameters and parameter macros that are customizable at design time.

#### Framework macros
The framework knows the following macros and replacements

| Macro          | Replacement  | Annotation  |
|:---------------|:-------------|:------------|
|#Language#|The user's spoken language as configured in the user object|Defaults to "en"|
|#SalesOrg#|The sales organisation code assigned to the user|Defaults to "0001"|
|#Client#|The client set for the user|Defaults to "010"|
|#UserPKey#|The PKey value of the current user|No default, since a valid user is required to use the app|
|#Today#|The current date in short ANSI format|"YYYY-MM-DD"|
|#MaxDate#|System wide maximum date value in short ANSI format|Fixed at "9999-12-31"|
|#MinDate#|System wide minimum date value in short ANSI format|Fixed at "1800-01-01"|
|#BusinessModified#|Used in tables that have a businessModified column to mark the latest change in short ANSI date/time format|"YYYY-MM-DD HH:MM:SS"|

#### Parameter macros
All parameter macros use the format #<ParameterName>#. Only parameters listed in the contract (see 2.5. Parameters) can be used here. If at runtime a parameter is not provided, the macro will be replaced by the empty string otherwise it will be replaced by the value provided for that parameter. The datasource designer is responsible for the correct parameter format, e.g. if a parameter is a string value, the macro must be surrounded by quotation marks. ( ' ).

### Quick Search Parameters
The Generator creates code to add Quick Search Parameter to the Select Statement if at least one Quick Search Parameter is available

### Example
```
<QuickSearchParameters>
  <QuickSearchParameter name="customer.name"/>
  <QuickSearchParameter name="customer.id"/>
  <QuickSearchParameter name="address.fullAddress"/>
</QuickSearchParameters>
```
Each Quick Search must define the following properties.

### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|Name of the Attribute to search (if ambiguous "table.column" notation can be used)|Attribute must be available and not ambiguous|

The generator creates the following source code:
```
if (Utils.isDefined(jsonQuery) && Utils.isDefined(jsonQuery.__quickSearchTermArray)) {
   sqlStmt += "AND ( 1 = 0 ";
   for (var idx = 0; idx < jsonQuery.__quickSearchTermArray.length; idx++) {
      var qsSearchTerm = jsonQuery.__quickSearchTermArray[idx];
      sqlStmt += " OR field1 LIKE " + qsSearchTerm;
      ...
      sqlStmt += " OR fieldN LIKE " + qsSearchTerm;
   }
   sqlStmt += ")";
}
```

### Conditional Parameters
Conditional Parameters create conditions if the Parameter is passed into the DataSource.

#### Conditional Parameter
Conditional Parameters are modeled and define additional Conditions if the parameter is passed into the datasource

#### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|||

#### SimpleConditions
one ore more  modeled  Conditions if a Parameter is set

#### Properties
| name           | Type  | optional | Annotation                              | Validations/Checks|
|:---------------|:------|:---------|:----------------------------------------|:------------------|
|leftSideValue|String|no|||	 
|comparator|String|no|||	 
|rightSideType|String|no|literal	Attribute, Parameter or Literal||	 
|rightSideValue|String|no|||

#### Example
```
<ConditionalParameters>
    <ConditionalParameter name="customerPKey">
      <SimpleConditions>
        <Condition leftSideValue="BpaOrderRole.CustomerPKey" comparator="EQ" rightSideType="Attribute" rightSideValue="'#customerPKey#'" />
      </SimpleConditions>
    </ConditionalParameter>
  </ConditionalParameters>
```

## Comparison operators
The following comparison operators could be used within join or where clause.

|Operator| Equivalent SQL Operator| Description|
|:-------|:-----------------------|:-----------|
|EQ|=|Equals|
|NE|<>|Not Equals|
|LT|<|Less Than|
|LE|<=|Less or Equals Than|
|GT|>|Greather Than|
|GE|>=|Greather or Equals Than|
