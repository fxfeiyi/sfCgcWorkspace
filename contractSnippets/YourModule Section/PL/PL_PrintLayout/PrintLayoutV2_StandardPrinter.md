# Print Layout V2 (PL) Contract Defintion for standard Printer

*** NOTE ***
```
This document is especially for standard printers and NOT for 3 inch thermal printer (endless paper). For 3inch thermal printer please have a look to the document PrintLayoutV2_3inchThermalPrinter.md in the same folder. 
```

## Table of Content
- [Description](#description)

## Description

Print Layouts describe the look and feel of a printed document to a paper. The main goal of this document is to have a common understanding of the different elements that constitute a definition of a Print Layout.
We mainly distinguish between two different types of Print Layout. 
- [Print Layout for standard printer](#contract-definition-standard-printer)
- Print Layout for 3inch bluetooth thermal printer endless paper
  - see document PrintLayoutV2_3inchThermalPrinter.md in the same folder like this document
  

The following element descriptions reflect the strcute and properties of the underlying XML
### Example
```
<PrintLayout> (attributes)
  <Declarations>
    <DataDeclaration> (attributes)
  <ReportLayout> (attributes)
  <DocumentProperties> (attributes)
```

## Contract Definition (Standard printer)

### \<PrintLayout\>
The following table describes the properties supported by the PrintLayout element:

### Properties
| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|Unique name of the PrintLayout element. The name attribute must be same as the folder name of the PrintLayoutV2 contract| |
|xmlns|String|no|value of this property needs to be "https://www.salesforce.com/cgcloud/xsds"| |
|xmlns:xsi|String|no|value of this property needs to be "http://www.w3.org/2001/XMLSchema-instance"| |

## Example
```
<PrintLayout name="My3InchThermalPrintoutPDF" xmlns="https://www.salesforce.com/cgcloud/xsds" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <Declarations>
      <Declaration name="MyVariable" type="MyObjectClass" />
      <Declaration name="MyImageName" type="Image" mimeType="image/png" imageId="CoralSpringLogo">
  </Declarations>
  <ReportLayout pageMargins="[40,40,40,40]">
    <!-- Report Layout Element definition -->
  </ReportLayout>
</PrintLayout>
```

The \<PrintLayout\> element supports child elements:
- [\<Declarations\>](#declaration)
- [\<ReportLayout\>](#reportlayout)
- [\<DocumentProperties\>](#documentproperties)

#### Sample Code
```
<PrintLayout xmlns="https://www.salesforce.com/cgcloud/xsds" name="StandardCashOrderPDF" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <Declarations>
    <DataDeclaration name="order" type="BoOrder" />
    <DataDeclaration name="salesOrg" type="LuSalesOrg" />
    <DataDeclaration name="myImageName" type="Image" mimeType="image/png" imageId="CompanyLogo" />
    <DataDeclaration name="textItems" type="BoOrderPrintTextItems" />
    <DataDeclaration name="signature1" type="Signature" /> 
  </Declarations>
  <ReportLayout pageMargins="[40,40,40,40]">
    
    <!-- Manufacturer Table -->
    <table name="ManufacturerTable" dontBreakRows="false" tableLayout="noBorders">
      <tbody>
        <tr>
          <td width="260" alignment="center" rowSpan="6">
            <img src="{{Declarations::myImageName}}" width="100" />
          </td>
          <td width="100" />
          <td width="130" alignment="left" bold="true">{{Declarations::salesOrg.text}}</td>
        </tr>
        <tr>
          <td alignment="right">{{Labels::AddressId; defaultLabel=Address:}}</td>
          <td>{{Declarations::salesOrg.houseNumber}} {{Declarations::salesOrg.street}} {{Declarations::salesOrg.zipCode}} {{Declarations::salesOrg.city}}</td>
        </tr>
        <tr>
          <td alignment="right">{{Labels::PhoneId; defaultLabel=Phone:}}</td>
          <td>{{Declarations::salesOrg.phone1}}</td>
        </tr>
        <tr>
          <td alignment="right">{{Labels::FaxId; defaultLabel=Fax:}}</td>
          <td>{{Declarations::salesOrg.fax1}}</td>
        </tr>
        <tr>
          <td alignment="right">{{Labels::TINId; defaultLabel=Tax Id:}}</td>
          <td>{{Declarations::salesOrg.taxJurisdictionCode}}</td>
        </tr>
        <tr>
          <td alignment="right">{{Labels::BankAccId; defaultLabel=Bank Account:}}</td>
          <td>{{Declarations::salesOrg.accountNumber}}</td>
        </tr>
      </tbody>
    </table>

    <!-- Header Table -->
    <table name="HeaderTable" tableLayout="noBorders">
      <tbody>
        <tr>
          <td width="100" alignment="right" />
          <td width="152" bold="true">{{Declarations::order.luDeliveryRecipient.name}} </td>
          <td width="100" alignment="right">{{Labels::DocumentNoId; defaultLabel=Document No.:}}</td>
          <td width="130">{{Declarations::order.orderId}}</td>
        </tr>
        <tr>
          <td alignment="right">{{Labels::CustomerAddressId; defaultLabel=Address:}}</td>
          <td bold="true">{{Declarations::order.luDeliveryRecipient.street}} {{Declarations::order.luDeliveryRecipient.houseNumber}}</td>
          <td alignment="right">{{Labels::OrderStatusId; defaultLabel=Order Status:}}</td>
          <td>{{Declarations::order.phaseText;}}</td>
        </tr>
        <tr>
          <td alignment="right" />
          <td bold="true">{{Declarations::order.luDeliveryRecipient.zipCode}} {{Declarations::order.luDeliveryRecipient.city}} </td>
          <td alignment="right">{{Labels::DeliveryDateId; defaultLabel=Delivery Date:}}</td>
          <td>{{Declarations::order.deliveryDate; dateTimeFormat=date}}</td>
        </tr>
        <tr>
          <td alignment="right" />
          <td bold="true">{{Declarations::order.luDeliveryRecipient.countryState}}</td>
          <td alignment="right">{{Labels::CustomerCommitDateId; defaultLabel=Order Date:}}</td>
          <td>{{Declarations::order.commitDate; dateTimeFormat=date}}</td>
        </tr>
        <tr>
          <td alignment="right">{{Labels::CustomerPhoneId; defaultLabel=Phone:}}</td>
          <td>{{Declarations::order.luDeliveryRecipient.phone1}}</td>
          <td alignment="right">{{Labels::SalesRepId; defaultLabel=Sales Rep:}}</td>
          <td>{{Declarations::order.luResponsible.name}}</td>
        </tr>
        <tr>
          <td alignment="right">{{Labels::CustomerNumberId; defaultLabel=Customer:}}</td>
          <td>{{Declarations::order.luDeliveryRecipient.customerNumber}}</td>
          <td alignment="right" />
          <td />
        </tr>
        <tr>
          <td alignment="right">{{Labels::CustomerOrderId; defaultLabel=Cust. PO No.:}}</td>
          <td>{{Declarations::order.customerOrderId}}</td>
          <td alignment="right" />
          <td />
        </tr>
      </tbody>
    </table>

    <!-- Order Items -->
    <h2 alignment="center">{{Labels::OderConfirmationId; defaultLabel=Order Confirmation}}</h2>
    <table tableLayout="lightHorizontalLinesMainItemsOnly" name="OrderItemsTable">
      <thead>
        <tr>
          <th width="75">{{Labels::PrdNumberId; defaultLabel=No.}}</th>
          <th width="*">{{Labels::TextId; defaultLabel=Product}}</th>
          <th width="25" alignment="center">{{Labels::UnitId; defaultLabel=Unit}}</th>
          <th width="25" alignment="center">{{Labels::QuantityId; defaultLabel=Qty}}</th>
          <th width="40" alignment="center">{{Labels::UnitPriceId; defaultLabel=Unit Price}}</th>
          <th width="48" alignment="center">{{Labels::FullAmountId; defaultLabel=Full Amount}}</th>
          <th width="48" alignment="center">{{Labels::NettoAmountId; defaultLabel=Net. Amount}}</th>
          <th width="18" alignment="center">{{Labels::TaxClassificationId; defaultLabel=T}}</th>
        </tr>
      </thead>
      <tbody>
        <each name="itemsEach" value="{{Declarations::order.loPrintItems}}">
          <filters>
            <filter fieldName="quantity" value="0" operator="GT" compareMode="NUMBER" />
            <filter fieldName="movementDirection" value="In" operator="NE" />
          </filters>
          <orderCriteria>
            <orderCriterion fieldName="prdId" direction="ASC" compareMode="NUMBER" />
          </orderCriteria>
          <tr>
            <td>{{.prdId}}</td>
            <td>{{.text1}}</td>
            <td alignment="center">{{.quantityLogisticUnit; toggleId=DomPrdLogisticUnit; toggleField=shortText}}</td>
            <td alignment="right">{{.quantity}}</td>
            <td alignment="right">{{.basePriceReceipt; numberFormat=8.2}}</td>
            <td alignment="right">{{.grossValueReceipt; numberFormat=8.2}}</td>
            <td alignment="right">{{.valueReceipt; numberFormat=8.2}}</td>
            <td alignment="center">{{.taxClassification; toggleId=DomTaxClassification; toggleField=shortText}}</td>
          </tr>
          <correlation name="correlation1" value="{{Declarations::order.loSdoConditions}}" key="pKey" correlationKey="sdoItemPKey">
            <filters>
              <filter fieldName="sdoItemPKey" value=" " operator="NE" />
              <filter fieldName="cpIsPrintRelevant" value="1" operator="EQ" />
            </filters>
            <tr>
              <td />
              <td italics="true" colSpan="7">{{path=.text1}} {{.conditionValue; numberFormat=8.2}} {{.conditionResult; numberFormat=8.2}}</td>
            </tr>
          </correlation>
        </each>
        <tr>
          <td colSpan="3" alignment="center">{{Labels::TotalId; defaultLabel=Total}}</td>
          <td alignment="right">
            <sum table="OrderItemsTable" col="3" />
          </td>
          <td colSpan="2" />
          <td alignment="right">
            <sum table="OrderItemsTable" col="6" numberFormat="8.2" />
          </td>
          <td />
        </tr>
      </tbody>
    </table>

    <!-- Returns -->
    <p bold="true">{{Labels::ReturnedItemsLabelId; defaultLabel=Returns}}</p>
    <table tableLayout="lightHorizontalLinesMainItemsOnly" name="ReturnsTable">
      <thead>
        <tr>
          <th width="75">{{Labels::PrdNumberId; defaultLabel=No.}}</th>
          <th width="*">{{Labels::TextId; defaultLabel=Product}}</th>
          <th width="25" alignment="center">{{Labels::UnitId; defaultLabel=Unit}}</th>
          <th width="25" alignment="center">{{Labels::QuantityId; defaultLabel=Qty}}</th>
          <th width="40" alignment="center">{{Labels::UnitPriceId; defaultLabel=Unit Price}}</th>
          <th width="48" alignment="center">{{Labels::FullAmountId; defaultLabel=Full Amount}}</th>
          <th width="48" alignment="center">{{Labels::NettoAmountId; defaultLabel=Net. Amount}}</th>
          <th width="18" alignment="center">{{Labels::TaxClassificationId; defaultLabel=T}}</th>
        </tr>
      </thead>
      <tbody>
        <each name="ReturnEach" value="{{Declarations::order.loPrintItems}}">
          <filters>
            <filter fieldName="quantity" value="0" operator="GT" compareMode="NUMBER" />
            <filter fieldName="movementDirection" value="In" operator="EQ" />
          </filters>
          <orderCriteria>
            <orderCriterion fieldName="prdId" direction="ASC" compareMode="NUMBER" />
          </orderCriteria>
          <tr>
            <td>{{.prdId}}</td>
            <td>{{.text1}}</td>
            <td alignment="center">{{.quantityLogisticUnit; toggleId=DomPrdLogisticUnit; toggleField=shortText}}</td>
            <td alignment="right">{{.quantity}}</td>
            <td alignment="right">{{.basePriceReceipt; numberFormat=8.2}}</td>
            <td alignment="right">{{.grossValueReceipt; numberFormat=8.2}}</td>
            <td alignment="right">{{.valueReceipt; numberFormat=8.2}}</td>
            <td alignment="center">{{.taxClassification; toggleId=DomTaxClassification; toggleField=shortText}}</td>
          </tr>
          <correlation name="correlation2" value="{{Declarations::order.loSdoConditions}}" key="pKey" correlationKey="sdoItemPKey">
            <filters>
              <filter fieldName="sdoItemPKey" value=" " operator="NE" />
              <filter fieldName="cpIsPrintRelevant" value="1" operator="EQ" />
            </filters>
            <tr>
              <td />
              <td italics="true" colSpan="7">  {{path=.text1}}    {{.conditionValue; numberFormat=8.2}}    {{.conditionResult; numberFormat=8.2}}</td>
            </tr>
          </correlation>
        </each>
        <tr>
          <td colSpan="3" alignment="center">{{Labels::ReturnTotalProductsId; defaultLabel=Total Returns}}</td>
          <td alignment="right">
            <sum table="ReturnsTable" col="3" />
          </td>
          <td colSpan="2" />
          <td alignment="right">
            <sum table="ReturnsTable" col="6" numberFormat="8.2" />
          </td>
          <td />
        </tr>
      </tbody>
    </table>
    
    <!-- Header Conditions -->
    <p bold="true">{{Labels::HeaderConditionsLabelId; defaultLabel=Header Conditions}}</p>
    <table tableLayout="noBorders" name="HeaderConditionsTable">
      <tbody>
        <each name="headerEach" value="{{Declarations::order.loSdoConditions}}">
          <filters>
            <filter fieldName="sdoItemPKey" value=" " operator="EQ" />
            <filter fieldName="cpIsPrintRelevant" value="1" operator="EQ" />
            <!-- As discussed with PO filter of header condition filters out empties total hard coded -->
            <filter fieldName="cndCpMetaPKey" value="00100000007hnjlk" operator="NE" />
          </filters>
          <orderCriteria>
            <orderCriterion fieldName="cndCpCalculationPosition" direction="ASC" />
          </orderCriteria>
          <tr>
            <td width="85" />
            <td width="255">{{.text1}}</td>
            <td width="auto" alignment="right">{{.conditionValue; numberFormat=8.2}}</td>
            <td width="auto" alignment="right">{{.conditionResult; numberFormat=8.2}}</td>
            <td width="auto" alignment="left">{{Declarations::order.currency}}</td>
          </tr>
        </each>
      </tbody>
    </table>
    
    <!-- Empties Table -->
    <p bold="true">{{Labels::EmtiesGridTitleId; defaultLabel=Empties}}</p>
    <table tableLayout="lightHorizontalLines" name="EmptiesTable">
      <thead>
        <tr>
          <th width="85">{{Labels::PrdNumberId; defaultLabel=No.}}</th>
          <th width="*">{{Labels::TextEmptyId; defaultLabel=Empties}}</th>
          <th width="40" alignment="right">{{Labels::DeliveredEmptiesId; defaultLabel=Del.}}</th>
          <th width="40" alignment="right">{{Labels::ReturnedEmptiesId; defaultLabel=Ret.}}</th>
          <th width="40" alignment="right">{{Labels::TotalQuantityEmptiesId; defaultLabel=Qty}}</th>
          <th width="18" alignment="center">{{Labels::TaxClassificationId; defaultLabel=T}}</th>
        </tr>
      </thead>
      <tbody>
        <each name="emptiesEach" value="{{Declarations::order.loEmptiesForPrintout}}">
          <orderCriteria>
            <orderCriterion fieldName="prdId" direction="ASC" />
          </orderCriteria>
          <tr>
            <td>{{.prdId}}</td>
            <td>{{.text1}}</td>
            <td alignment="right">{{.quantityDelivered}}</td>
            <td alignment="right">{{.quantityReturned}}</td>
            <td alignment="right">{{.totalQuantity}}</td>
            <td alignment="center">{{.taxClassification}}</td>
          </tr>
        </each>
        <tr>
          <td colSpan="4" alignment="right">{{Labels::SumEmptiesLabelId; defaultLabel=Total Empties}}</td>
          <td alignment="right">
            <sum table="EmptiesTable" col="4" />
          </td>
          <td />
        </tr>
      </tbody>
    </table>

    <!-- Total Table -->
    <table tableLayout="noBorders" name="TotalTable">
      <thead>
        <tr>
          <th width="*" />
          <th width="auto" alignment="right" />
          <th width="auto" alignment="right" />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td />
          <td alignment="right">{{Labels::TotalPrdId; defaultLabel=Total Products and Other Items}}</td>
          <td alignment="right">{{Declarations::order.totalValueReceipt; numberFormat=8.2}} {{Declarations::order.currency}}</td>
        </tr>
        <tr>
          <td />
          <td bold="true" alignment="right">{{Labels::TotalAmountId; defaultLabel=Total Amount}}</td>
          <td bold="true" alignment="right">{{Declarations::order.grossTotalValueReceipt; numberFormat=8.2}} {{Declarations::order.currency}}</td>
        </tr>
        <tr>
          <td />
          <td bold="true" alignment="right">{{Labels::PaymentMethodId; defaultLabel=Payment Method}}</td>
          <td bold="true" alignment="left">{{Declarations::order.paymentMethodText;}}</td>
        </tr>
        <tr>
          <td />
          <td bold="true" alignment="right">{{Labels::TotalPaidAmountId; defaultLabel=Total Paid Amount}}</td>
          <td bold="true" alignment="right">{{Declarations::order.paidAmountReceipt; numberFormat=8.2}} {{Declarations::order.currency}}</td>
        </tr>
        <tr>
          <td />
          <td bold="true" alignment="right">{{Labels::BalanceId; defaultLabel=Balance}}</td>
          <td bold="true" alignment="right">{{Declarations::order.balance; numberFormat=8.2}} {{Declarations::order.currency}}</td>
        </tr>
      </tbody>
    </table>
    
    <!-- Signature Table  -->
    <table name="SignatureTable" tableLayout="noBorders">
      <tbody>
        <tr>
          <td width="160" alignment="center" >
            <img src="{{Declarations::signature1}}" width="160" alignment="left" />
          </td>
          <td width="100"/>
          <td width="160"/>
        </tr>
        <tr>
          <td>{{Declarations::textItems.signature1Name}}</td>
          <td />
          <td />       
        </tr>
      </tbody>
    </table>
        
    <p>{{Declarations::salesOrg.legalInformation}}</p>
    <p>{{Declarations::textItems.endOfPrint}}</p>
  </ReportLayout>
</PrintLayout>
```

### Declaration
Declaration specifies an interface between the Process which is calling the PDF Print and the Printlayout. You can define a variable (for example, BO, images) in the Declarations element (within the ReportLayout element). 

The Declarations element can contain the following element:
- DataDeclaration

The following table lists the properties supported by the DataDeclaration element:

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|variable name|check for unique variable name|
|type|String|no|type of the variable. Can be a Bo..., LU..., "Signature" or of type "Image"| |
|mimeType|String|yes/no|only required if @type is "image". Allowed values are "image/png" and "image/svg". Defines the type of the image| |
|imageId|String|yes/no|only required if @type is image. In that case the id needs to be a Image which is maintained as attaching image. Defines the identification name of the image. The ImageId must match with the ImageId available in the Modeler | |

***Limitations***
- If the print engine can’t extract or retrieve an image file, a broken image is displayed.
- Images are maintained in Modeler as attaching image files from a mobile device isn’t supported.

### Example
```
<PrintLayout xmlns="https://www.salesforce.com/cgcloud/xsds" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="OrderConfirmationPDF">
  <Declarations>
    <DataDeclaration name="order" type="BoOrder" />
    <DataDeclaration name="salesOrg" type="LuSalesOrg" />
    <DataDeclaration name="myImageName" type="Image" mimeType="image/png" imageId="CoralSpringLogo" />
    <DataDeclaration name="textItems" type="BoOrderPrintTextItems" />
  </Declarations>
```

### ReportLayout
These attributes are supported by a Report Layout element:

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|pageSize|String|yes|Defines the page layout of the document, which is case-sensitive. The defalut valu is A4. The other supported page layouts are A5, EXECUTIVE,FLOIO,LEGAL,LETTER,TABLOID||
|pageMargin|String|yes|Defines the page margin for the document in one of the following formats. The default value is [40,60,40,60]<br>- [left,top,right,bottom]||

#### Supported Child elements of a ReportLayout
| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|[\<header\>](#header)|String|yes|The header element defines a header in the top margin of all the pages in a document.||
|[\<footer\>](#footer)|String|yes|The footer element defines the footer in the bottom margin of every page in a document.||
|[\<img\>](#img)|String|yes|||
|[\<lineFeed\>](#linefeed)|String|yes|to print an empty line to get some space||
|[\<p\>](#p)|String|yes|||
|[\<h1\>,\<h2\>](#h1-and-h2)|String|yes|Defines the size of the text.||
|[\<table\>](#table)|String|yes|||
|[\<pageNumber\>](#pagernumber)|String|yes|The pageNumber element defines the page number in the header or footer area on each page of the document.||
|[\<each\>](#each)|String|yes|The each element iterates based on the List Object (LO) that is set in the value attribute and reates the rows for a table using the tr and td elements. This attribute allows you to define the multiple variables that can be extracted from the same LO specified in the value attribute.||
|[Macros](#macros)|String|yes|Macros perform the data lookup on the referenced contract types, and filter and replace the relevant values for the following attributes or nodes in the printlayoutv2 contracts.||

#### Example
```
  <ReportLayout pageMargins="[5,0,5,0]" pageSize="[216, auto]">

    <img src="{{Declarations::myImageName}}"  width="100" alignment="center"/>

    <lineFeed/>
    <lineFeed/>
    <p bold="true" alignment="center">{{Declarations::salesOrg.text}}</p>


    <!--Manufacturer Table-->
    <table name="ManufacturerTable" dontBreakRows="false" tableLayout="noBorders">
      <thead>
        <tr>
          <th width="50%" alignment="right"></th>
          <th width="50%" alignment="left"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{Labels::AddressId; defaultLabel=Address:}}</td>
          <td>{{Declarations::salesOrg.houseNumber}} {{Declarations::salesOrg.street}} 	
{{Declarations::salesOrg.zipCode}} {{Declarations::salesOrg.city}}</td>
        </tr>
        <tr>
          <td >{{Labels::PhoneId; defaultLabel=Phone:}}</td>
          <td>{{Declarations::salesOrg.phone1}}</td>
        </tr>
        <tr>
          <td >{{Labels::FaxId; defaultLabel=Fax:}}</td>
          <td>{{Declarations::salesOrg.fax1}}</td>
        </tr>
        <tr>
          <td >{{Labels::TINId; defaultLabel=Tax Id:}}</td>
          <td>{{Declarations::salesOrg.taxJurisdictionCode}}</td>
        </tr>
        <tr>
          <td >{{Labels::BankAccId; defaultLabel=Bank Account:}}</td>
          <td>{{Declarations::salesOrg.accountNumber}}</td>
        </tr>
      </tbody>
    </table>
```

### \<header\>
The header element defines a header in the top margin of all the pages in a document. A header element does not have any property

The header element supports child elements:
- [\<table\>](#table)<br>
- [\<img\>](#img)

***Limitation***
If the height of the page header exceeds 3 text lines, the additional text is clipped.

#### Example
````
<!-- left out details for brevity -->
<header>
  <table name="headerTable">
    <thead>
      <tr>
        <th width="150" alignment="right">
          {{Declarations::orderer.address}}
          {{Declarations::orderer.zip}} {{Declarations::orderer.city}}
        </th>
      </tr>
    </thead>
    <tbody />
  </table>
</header>
````

### \<footer\>
The footer element defines the footer in the bottom margin of every page in a document. A footer element does not have any property

The footer element supports child elements:
- [\<table\>](#table)

***Limitation***
If the height of the page footer exceeds 3 text lines, the additional text is clipped.

#### Example
````
<!-- left out details for brevity -->
<!-- left out details for brevity -->
<footer>
  <table name="footerTable">
    <thead>
      <tr>
        <th width="150" alignment="center">© 2020 Salesforce</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td width="150" alignment="center">All rights reserved. </td>
      </tr>
    </tbody>
  </table>
</footer>
````

### \<img\>
The img element inserts an image into a document

The following properties are supported by a img element
| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|src|String|no|Refers to an image specified in the Declaration section. If the binding in this attribute does not redirect to an image (specified within Declaration section), a broken image is displayed. The macros feature is supported for the attribute||
|width|pos. Integer|no|Defines the width of the bounding box in percent||
|alignment|String|no|supported values are<br>- center<br>- left<br>- right||

### lineFeed
The lineFeed element generates an empty line. A lineFeed element does not have any property

### \<p\>
The \<p\> element creates a paragraph in the document.

The following properties are supported by a p element
| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|bold|Boolean|yes|Display the selected text in bold formatting||
|italics|Boolean|yes|Displays a text in italic formatting||
|alignment|String|yes|Alignes the intended text to the: <br> - left<br>- right<br>- center||

***Limitations***

The \<p\> element does not support the \<img\> element

#### Example
```
<p bold="true">{{Labels::ReturnedItemsLabelId; defaultLabel=Returns}}</p>
```

### \<h1\> and \<h2\>
The h1 element creates a main heading and the h2 element creates a sub-heading for a document.

The following properties are supported by a h1 and h2 element
| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|bold|Boolean|yes|Display the selected text in bold formatting||
|italics|Boolean|yes|Displays a text in italic formatting||
|alignment|String|yes|Alignes the intended text to the: <br> - left<br>- right<br>- center||

The h1 and h2 element supports child elements:
- [text](#text)

#### Example
```
<<!-- left out details for brevity -->
<h1 alignment="left" bold="true">Order Confirmation</h1>
<h2 alignment="left" bold="false">Order Details</h2>
```

#### text
The text element defines the labels or data or any sequence of terms that belongs to a document.
This element does not contain any attribute or child element. It supports the macros feature.

The text element can be used within the following:
- [\<p\>](#p)
- [\<h1\> and \<h2\>](#h1-and-h2)
- [\<td\>](#td)
- [\<th\>](#th)

#### Example with macros
````
<!--Macros-->
<tr>
  <td alignment="right">{{Labels::AddressId; defaultLabel=Address:}}</td>
  <td>
    {{Declarations::salesOrg.houseNumber}} {{Declarations::salesOrg.street}}
    {{Declarations::salesOrg.zipCode}} {{Declarations::salesOrg.city}}</td>
  <td />
</tr>
````


### \<table\>
The table element creates a tabular data with rows and columns in the intended page of a PDF document. You must restrct the table content to fit within the defined page width. Otherwise, the content is trimmed based on the page width.

The following properties are supported by a table element
| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|Unique name of the table||
|tableLayout|String|Yes|Refers to the layout taht arranges the content into rows and columns. You can define one of the follwing layouts:<br>- noBorders<br>- headerLineOnly<br>- lightHorizontalLines<br>- ||
|dontBreakRows|Boolean|Yes|Enables or disables a row to break across multiple pages. The default is true. Only Yes is supported for 3inch thermal printer endless paper||

The table element supports child elements:
- [thead](#thead)
- [tbody](#tbody)

#### Example
```
    <table name="ManufacturerTable" dontBreakRows="false" tableLayout="noBorders">
      <thead>
        <tr>
          <th width="50%" alignment="right"></th>
          <th width="50%" alignment="left"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{Labels::AddressId; defaultLabel=Address:}}</td>
          <td>{{Declarations::salesOrg.houseNumber}} {{Declarations::salesOrg.street}} 	
{{Declarations::salesOrg.zipCode}} {{Declarations::salesOrg.city}}</td>
        </tr>
      </tbody>
```

#### thead
The thead element creates a header row in a table and has to be defined prior to the tbody
element. This element does not support any attribute and it can contain a child element, \<tr\>

#### \<tr\>
The tr element defines a row in a table.
This element does not support any attribute and it can contain the following elements:<br>
- [\<th\>](#th) (within the thead node)
- [\<td\>](#td) (within the tbody node)

#### \<th\>
The \<th\> element defines a header cell in the table.

The \<th\> element supports the following peroperties
| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|colSpan|String|yes|Defines the number of String No columns a cell should span||
|rowSpan|String|yes|Defines the number of rows a cell should span||
|bold|Boolean|yes|Displays a text in bold formatting||
|italics|Boolean|yes|Displays a text in italic formatting||
|alignment|String|yes|Alignes the intended text to the: <br> - left<br>- right<br>- center||
|width|auto or a pos. integer|yes|Defines the width of a table cell. This attribute applies only for the table element which does not declare the thead element. If the width is speficied the serveral \<tr\> and \<td\> nodes within the \<tbody\> element, the width of the first \<tr\> node is considered and the width of the remaining nodes is ignored. ||

This element does not support any attribute and it can contain the following elements:
- [text](#text)
- [\<img\>](#img)
- [\<pageNumber\>](#pagernumber)

#### Example
```
<th width="75">{{Labels::PrdNumberId; defaultLabel=No.}}</th>
<th width="*">{{Labels::TextId; defaultLabel=Product}}</th>
<th width="25" alignment="center">{{Labels::UnitId; defaultLabel=Unit}}</th>
```

#### \<td\>
The \<td\> element defines a data cell in the table.

The \<td\> element supports the following peroperties
| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|colSpan|String|yes|Defines the number of String No columns a cell should span||
|rowSpan|String|yes|Defines the number of rows a cell should span||
|bold|boolean|yes|Displays a text in bold formatting||
|italics|boolean|yes|Displays a text in italic formatting||
|alignment|String|yes|Alignes the intended text to the: <br> - left<br>- right<br>- center||
|width|auto or a pos. integer|yes|Defines the width of a table cell. This attribute applies only for the table element which does not declare the thead element. If the width is speficied the serveral \<tr\> and \<td\> nodes within the \<tbody\> element, the width of the first \<tr\> node is considered and the width of the remaining nodes is ignored. ||

This element does not support any attribute and it can contain the following elements:
- [text](#text)
- [\<img\>](#img)
- [\<pageNumber\>](#pagernumber)

#### Example
```
<td width="300" alignment="center" rowSpan="6">
  <pageNumber/>
  <img src="{{Declarations::myImageName}}" width="100"/>
</td>
<td width="150" alignment="left" bold="true">{{Declarations::salesOrg.text}}
</td>
```

#### colSpan
The colSpan attribute defines the number of column a cell should horizontally span. This attribute allows a single table cell to merge the width of more than one cell or column. The value specified in the colSpan attribute refers the number of cell it should span. You can use the colSpan attribute only within the td and the th elements.

#### Example

For example, when you specify the colSpan attribute as 4, the data cell merges the 4 cells in column wise.
```
<!-- left out details for brevity -->
<td colSpan="4" alignment="right">{{Labels::SumEmptiesLabelId; defaultLabel=TotalEmpties}}</td>
<td alignment="right">
  <sum table="EmptiesTable" col="4" />
</td>
<td />
```

#### rowSpan
The rowSpan attribute defines the number of row a cell should vertically span. This attribute allows a single table cell to merge the height of more than one cell or row. The value specified in the rowSpan attribute refers the number of cell it should span. You can use the rowSpan attribute only within the td and the th elements.

#### Example

In this sample code, an image is inserted into the table by merging the 6 cells in row wise.
```
<table name="ManufacturerTable" dontBreakRows="false">
  <tbody>
    <tr>
      <td width="260" alignment="center" rowSpan="6">
        <img src="{{Declarations::myImageName}}" width="100" />
      </td>
      <td width="100" />
      <td width="130" alignment="left" bold="true">{{Declarations::salesOrg.text}}</td>
    </tr>
    <tr>
      <td alignment="right">{{Labels::AddressId; defaultLabel=Address:}}</td>
      <td>
        {{Declarations::salesOrg.houseNumber}} {{Declarations::salesOrg.street}}
        {{Declarations::salesOrg.zipCode}} {{Declarations::salesOrg.city}}
      </td>
    </tr>
    <tr>
      <td alignment="right">{{Labels::PhoneId; defaultLabel=Phone:}}</td>
      <td>{{Declarations::salesOrg.phone1}}</td>
    </tr>
    <tr>
      <td alignment="right">{{Labels::FaxId; defaultLabel=Fax:}}</td>
      <td>{{Declarations::salesOrg.fax1}}</td>
    </tr>
    <tr>
      <td alignment="right">{{Labels::TINId; defaultLabel=Tax Id:}}</td>
      <td>{{Declarations::salesOrg.taxJurisdictionCode}}</td>
    </tr>
    <tr>
      <td alignment="right">{{Labels::BankAccId; defaultLabel=Bank Account:}}</td>
      <td>{{Declarations::salesOrg.accountNumber}}</td>
    </tr>
  </tbody>
</table>
```

#### \<sum\>
The \<sum\> element aggregates the numeric values within a table.

The \<td\> element supports the following peroperties
| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|table|String|no|Refers to the name of the talbe to sum||
|col|String|no|Refers to the column of the table to sum||
|numberFormat|Number|yes|Refers to the format of a number. For mor information fefer format attribute (FLE todo)||

***Limitiations***
- The selected cells to sum must be within the tbody element. The sum operation is not supported, if the selected cells are within
the thead element.
- The values to sum must be numeric.
- If the selected cell contains text values, the sum action is ignored.
- The sum action of the sum values are ignored.
- If the column defined for sum is greater or lesser than the available columns, the sum is 0.
- The sum tag does not consider the rounded values created by the numberFormat attribute. Instead, it adds the actual values
in the table.
- The sum tag ignores the table rows that are created by the correlation element.

#### Example
```
<td alignment="right">
  <sum table="OrderItemsTable" col="6" numberFormat="8.2" />
</td>
```

#### tbody
The tbody element groups the content in a table. This element does not support any attribute. 

It can contain a child element, 
- [\<tr\>](#tr)

#### Example
```
    <table name="ManufacturerTable" dontBreakRows="false" tableLayout="noBorders">
      ....
      ....
      <tbody>
        <tr>
          <td>{{Labels::AddressId; defaultLabel=Address:}}</td>
          <td>{{Declarations::salesOrg.houseNumber}} {{Declarations::salesOrg.street}} 	
{{Declarations::salesOrg.zipCode}} {{Declarations::salesOrg.city}}</td>
        </tr>
      </tbody>

```

### \<pagerNumber\>
The pageNumber element defines the page number in the header or footer area on each page of the document.

This element does not support any property or child element. 

***Limitiations***
The pageNumber element can be used only within the header and the footer elements.

#### Example
````
<footer>
  <table name="table3">
    <thead>
      <tr>
        <th width="*" alignment="left">All rights reserved. some more footer text</th>
        <th width="auto" alignment="right"></th>
        <th width="100"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td></td>
        <td><pageNumber/></td>
        <td></td>
      </tr>
    </tbody>
  </table>
</footer>
````

### \<each\>
The each element iterates based on the List Object (LO) that is set in the value attribute and
creates the rows for a table using the tr and td elements. This attribute allows you to define the
multiple variables that can be extracted from the same LO specified in the value attribute.

The \<each\> element supports the following peroperties
| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|Unique name of the each element||
|value|String|no|Defines the binding that is associated with a LO. The macros feature is supported for this attribute as well||

This element supports the following child elements:
- [\<tr\>](#tr)
- [\<filters\>](#filters) (optional)
- [\<orderCriteria\>](#ordercriteria) (optional)
- [\<correlation\>](#correlation) (optional)

#### Example
In the following sample code, the value attribute within the each element refers the macro path {{Declarations::orderItems}} ( LO) which has the required properties. The variables defined in the td element refers to the multiple properties which can be extracted from the same list items of the LoOrderItems.
```
<!-- left out details for brevity -->
<Declarations>
  <DataDeclaration name="order" type="LuOrder" />
  <DataDeclaration name="orderer" type="LuOrderer" />
  <DataDeclaration name="recipient" type="LuRecipient" />
  <DataDeclaration name="orderItems" type="LoOrderItems" />
</Declarations>
<!--Trimmed code -->
<tbody>
  <each name="each1" value="{{Declarations::orderItems}}">
    <tr>
      <td>{{.id}}</td>
      <td italics="true">{{.name}}</td>
      <td>{{.unit}}</td>
      <td>{{.quantity}}</td>
      <td>{{.price; numberFormat=8.2}}</td>
      <td>{{.total}}</td>
      <td>{{.netTotal}}</td>
    </tr>
  </each>
</tbody>
```

### \<filters\>
The filters element is defined to filter the List Items(LI) of the List Object(LO). You can define more than one filter and apply them together. 

This element can contain a child element,
- [\<filter\>](#filter)

### \<filter\>
The \<filter\> element supports the following peroperties
| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|fieldName|String|no|Refers to the name of any LI field within a LO to filter. If the fieldName attribute is other than the values included in the available list, an empty filtered list is displayed||
|operator|String|no|Refers to the operator type. This attribute can have the following values:<br>- EQ<br>- NE<br>- LT<br>- LE<br>- GT<br>- GE<br> EQ = Equal, NE = Not Equal, LT = Less Than, LE = Less Equal, GT = Greater Than, GE = Greater Equal||
|value|Literal|no|Refers to the value that is filtered||
|compareMode|STRING or NUMBER|yes|Refers to the value that is compared. the default value is STRING||

#### Example
```
<filters>
  <filter fieldName="quantity" value="0" operator="GT" compareMode="NUMBER" />
  <filter fieldName="movementDirection" value="In" operator="NE" />
</filters>
```

### \<orderCriteria\>
The orderCriteria sorts the List Item (LI) of a List Object (LO). This element does not support any attribute. 

This element can contain a child element,
- [\<orderCriterion\>](#ordercriterion)

### \<orderCriterion\>
The orderCriterion element sorts the list based on the input values. If more than one element
is defined, then the first defined value is sorted and the list is further sorted based on the subsequent
defined values. 

This element does not support child elements.

The \<orderCriterion\> element supports the following peroperties
| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|fieldName|String|no|Refers to the name of any LI field within LO to sort||
|direction|String|no|Refers to the sorting order. This attribute can have the following values:<br>- ASC<br>- DESC<br>ASC = Ascending order, DESC = Descending order||
|compareMode|STRING or NUMBER|yes|Referes to the value that is compared. The default vlaue is STRING||

#### Example
```
<orderCriteria>
  <orderCriterion fieldName="prdId" direction="DESC" compareMode="NUMBER" />
</orderCriteria>
```

### \<correlation\>
The correlation element creates the rows for a table based on the iteration over the List Object (LO) that has been set in the value attribute. This element matches up the list object (used within the each node) with another LO.
The correlation is used in reports where you need to print additional Information in a list,
using correlated information from two lists.

***Limitation:*** 
The correlation element is used only within the each node.

The \<correlation\> element supports the following peroperties
| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|name|String|no|Unique name of the correlation element||
|value|String|no|Defines the binding that is associated with a LO. The macros feature is supported for this attribute||
|key|String|no|Specifies the correlation attribute of the parent object||
|correlationKey|String|no|Specifies the property of the list item which are in the correlation||

This element supports the following child elements:
- [\<tr\>](#tr)
- [\<filters\>](#filters) (optional)
- [\<orderCriteria\>](#ordercriteria) (optional)

#### Example
```
<!-- left out details for brevity -->
<tbody>
  <each name="itemsEach" value="{{Declarations::order.loPrintItems}}">
    <filters>
      <filter fieldName="quantity" value="0" operator="GT" compareMode="NUMBER" />
      <filter fieldName="movementDirection" value="In" operator="NE" />
    </filters>
    <orderCriteria>
      <orderCriterion fieldName="prdId" direction="ASC" compareMode="NUMBER" />
    </orderCriteria>
    <tr>
      <td>{{.prdId}}</td>
      <td>{{.text1}}</td>
      <td alignment="center">{{.quantityLogisticUnit; toggleId=DomPrdLogisticUnit; toggleField=shortText}}</td>
      <td alignment="right">{{.quantity}}</td>
      <td alignment="right">{{.basePriceReceipt; numberFormat=8.2}}</td>
      <td alignment="right">{{.grossValueReceipt; numberFormat=8.2}}</td>
      <td alignment="right">{{.valueReceipt; numberFormat=8.2}}</td>
      <td alignment="center">{{.taxClassification; toggleId=DomTaxClassification; toggleField=shortText}}</td>
    </tr>
    <correlation name="correlation1" value="{{Declarations::order.loSdoConditions}}" key="pKey" correlationKey="sdoItemPKey">
      <filters>
        <filter fieldName="sdoItemPKey" value=" " operator="NE" />
        <filter fieldName="cpIsPrintRelevant" value="1" operator="EQ" />
      </filters>
      <tr>
        <td />
        <td italics="true" colSpan="7">{{path=.text1}} {{.conditionValue; numberFormat=8.2}} {{.conditionResult; numberFormat=8.2}}</td>
      </tr>
    </correlation>
  </each>
  <tr>
    <td colSpan="3" alignment="center">{{Labels::TotalId; defaultLabel=Total}}</td>
    <td alignment="right">
      <sum table="OrderItemsTable" col="3" />
    </td>
    <td colSpan="2" />
    <td alignment="right">
      <sum table="OrderItemsTable" col="6" numberFormat="8.2" />
    </td>
    <td />
  </tr>
</tbody>
```
When the print engine executes the binding {{Declarations::order.loSdoConditions}} , the list items with pkey are compared with the correlationKey="sdoItemPKey". The bindings {{path=.text1}} {{.conditionValue; numberFormat=8.2}} {{.conditionResult; numberFormat=8.2}} within the correlation section relates to the LO specified for the correlation node. The extracted additional information about the product are inserted into the rows below the product name. In addition, the resulted list is filtered based on the cpIsPrintRelevant property.

### Macros
Macros perform the data lookup on the referenced contract types, and filter and replace the relevant values for the following attributes or nodes in the printlayoutv2 contracts. 

The print engine allows the macros to bind the referenced data to the labels and the bindings.
- value (within each node)
- value (within the correlation node)
- [text](#text)
- src (within the img node)

#### Labels
The macros path that is bound to the label section starts with Labels, replaces the content by searching for the labels in referenced
Locale contracts. This serves mainly while translating the labels by referencing the desired locale contracts.

***Note:***

• You can define the defaultLabel, which is an optional attribute. When macros path can’t identify the values within a
locale contract, it extracts the value specified in the defaultLabel attribute. The default Label is also used as value during the label extraction and the Refresh Locale process.<br>
• The id of the node in the locale contract is decided based on the folder in which the print contract is available.


The following lists the standard ways to refer the labels:<br>
• {{Labels::PrintLayouts.<PrintLayoutName>.<labelName>; defaultLabel=<fallback>}}<br>
• {{Labels::<labelName>; defaultLabel= <fallback>}}<br>
• {{Globals::Yes; defaultLabel= <fallback>}}


***Note:***

 If you don’t include the reference label name as prescribed in the preceding list of standard ways (with the appropriate letter case), the label extraction is failed or unresolved.

#### Example
Here’s an example scenario that describes how the label is extracted from the referenced locale contract. In the following macros path, the print engine navigates to the "OrderConfimationPrint" (PrintLayout id) within the PrintLayouts section. It does data lookup for the CustomerNumberId in the list of id, then extracts the associated value defined in the text and displays it in the PDF print document.

```
{{path=Labels::PrintLayouts.OrderConfirmationPrint.CustomerNumberId; defaultLabel="Customer Number"}}
```
You can also shorten the code by directly mentioning the label name as follows:
```
<!--Labels-->
<tr>
  <th width="85">{{Labels::PrdNumberId; defaultLabel=No.}}</th>
  <th width="*">{{Labels::TextEmptyId; defaultLabel=Empties}}</th>
  <th width="40" alignment="right">{{Labels::DeliveredEmptiesId;defaultLabel=Del.}}</th>
  <th width="40" alignment="right">{{Labels::ReturnedEmptiesId;defaultLabel=Ret.}}</th>
  <th width="40" alignment="right">{{Labels::TotalQuantityEmptiesId;defaultLabel=Qty}}</th>
  <th width="18" alignment="center">{{Labels::TaxClassificationId;defaultLabel=T}}</th>
</tr>
```
#### Bindings
The macros path that is bound to data starts with Declarations. This replaces the macro content with the value in the referenced BusinessObject/ListObject.

Initially, you have to declare the BO or the LO in the DataDeclaration attribute, later you can use the variables associated with these objects while defining the macros path. If the macros path results in null or is unresolved, the macro is displayed in the output document for debugging.

#### Example
In the following sample code, the macros path is defined for extracting the address data. The salesorg object is declared with the LuSalesOrg type in the DataDeclaration attribute. When the path {{Declarations::salesOrg.houseNumber}} executes, the print engine performs the data lookup for the houseNumber variable, extracts the associated value, and displays it in the document.
```
<!-- left out details for brevity -->
<Declarations>
  <DataDeclaration name="order" type="BoOrder" />
  <DataDeclaration name="salesOrg" type="LuSalesOrg" />
</Declarations>
<ReportLayout pageMargins="[40,40,40,40]">
  <table name="ManufacturerTable" dontBreakRows="false" tableLayout="noBorders">
    <tbody>
      <tr>
        <td alignment="right">{{Labels::AddressId; defaultLabel=Address:}}</td>
        <td>{{Declarations::salesOrg.houseNumber}} {{Declarations::salesOrg.street}} {{Declarations::salesOrg.zipCode}} {{Declarations::salesOrg.city}}</td>
      </tr>
      <tr/>
    </tbody>
  </table>
</ReportLayout>
```
In addition, you can define the typical bindings for the repetitive variables in each and correlation nodes.
The following are the optional attributes that can be part of macros:<br>
- [Toggles](#toggles)
- [numberFormat](#numberformat)
- [dateTimeFormat](#datetimeformat)

#### Toggles
A macro path can be defined to toggle using the toggleId and toggleField attributes.

The toggles element supports the following peroperties
| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|toggleId|String|no|Refers to the identifier of a domain||
|toggleId|String|no|Refers to the text of short text as you've specified||

***Limitation:***

- An ImageId can’t be toggled.
- The labels and the toggle values are bound to the locale of the user logged into the Consumer Goods offline mobile 
app.

#### Example
```
<td bold="true">{{Declarations::header.luDeliveryRecipient.countryState; toggleId=DomCountryState; toggleField=shortText}}</td>
```

#### numberFormat
The numberFormat is an optional attribute, which defines the format of a number. This attribute is similar to the formatV2. For more information, refer formatV2 attribute.

#### Example
```
<td alignment="right">{{.basePriceReceipt; numberFormat=8.2}}</td>
<td alignment="right">{{.grossValueReceipt; numberFormat=8.2}}</td>
```

#### dateTimeFormat
The dateTimeFormat is an optional attribute that can be defined within a macro. It defines the format of date and time.
As default, the dateTimeFormat attribute uses the formatting defined for the following keys in the locale contract:

- date
- [dateTime](#datetimeformat)
- time
- shortDate

These keys are available in the DateFormats within the Localizations section of the locale contract. These keys are case-sensitive. When you make changes in the DateFormats section, it affects the UI, not the underlying data, which retains the formatting of the default locale. This allows the date and time format in the PDF print documents to be displayed based on the locale. In case, these special keys aren’t defined in the referenced locale contract, the print engine applies the internal fallback.

#### Example
Here’s an example scenario that describes how to refer the localized date and time format defined in the locale contract with the dateTimeFormat attribute. In the following bindings, the Date and the DateTime attribute values reflect the format mentioned in the locale contract (as shown in the following figure).
```
- {{Declarations::order.deliveryDate; dateTimeFormat=Date}}
- {{Declarations::order.deliveryDate; dateTimeFormat=DateTime}}
```

***Limitations:***

- You can use the blank space or the following special characters as separators in the datetimeFormat attribute [:, /, -, .].
- The strings of the format options (for example, dddd) within the datetimeFormat attribute can’t be translated.
- If the defined macro value for the datetimeFormat isn’t in the ANSI or ISO 8601 format, the result is displayed as ###.
- If the defined format string contains an invalid character (other than the prescribed format strings), the result is displayed as
###.

The following table lists the additional format ways supported by the dateTimeFormat attribute during exceptional cases:

| Format  | Description  | Samples|
|:--------|:-------------|:-------|
|YY|Defines the year in two-digits|18|
|YYYY|Defines the year in four-digits|2024|
|M|Defines the month starting from 1 to 12 (without leading zeros)|1,2,3,....,12|
|MM|Defines the month as two-digits (with leading zeros for single-digits months)|01,02,03,....,12|
|MMM|Defines the month in abbreviated form|Jan,Feb,Mar,Apr,....,Dec|
|MMMM|Defines the full name of the specified month|January|
|D|Defines the day of the month, starting from 1 to 31 (without leading zeros)|1,2,3,...,31|
|DD|Defines the day of the month, as two-digits (with leading zeros for the single-digit days)|01,02,03,...,31|
|d|Defines the day of the week, starting from 0 to 6 (with Sunday as 0)|0,1,2,3,4,5,6,|
|dd|Defines the day of the week with the first gwo-characters|Su,Mo,Tu,We,Th,Fr,Sa|
|ddd|Defines the day of the week in abbreciated form|Sun,Mon,Tue,Wed,Thu,Fri,Sat|
|dddd|Defines the day of the week in full form|Sunday, Monday, ..., Saturday|
|H|Defines the hour in the 24-hour clock format, Starting from 0 to 23 (without leading zeros for the single-digit)|0,1,2,3,...23|
|HH|Defines the hour in the 24-hour clock format, starting from 0 to 23 (with leading zeros for the single-digit)|00,01,02,....,23|
|h|Defines the hour in the 12-hour clock format, starting from 0 to 12 (without leading zeros for the single-digit)|1,2,3,...,12|
|hh|Defines the hour in the 12-hour clock format, starting from 0 to 12 (with leading zeros for the single-digit)|01,02,03,.....,12|
|m|Defines the minutes, starting from 0 to 59 (without leading zeros for the single-digit)|0,1,2,3,...,59|
|mm|Defines the minutes, starting from 0 to 59 (with leading zeros for the single-digit)|00,01,02,03,...,59|
|s|Defines the seconds, starting from 0 to 59 (without leading zeros for the single-digit|0,1,2,3,...,59|
|ss|Defines the seconds, starting from 0 to 59 (without leading zeros for the single-digit|00,01,02,03,...,59|
|SSS|Defines the milliseconds in three-digits, starting from 000 to 999|000,001,002,003,...,999|
|Z|Defines the time with UTC (Coordinated Universal Time) offset for the specified place and date in the following format: +/-HH:mm|+05:00|
|ZZ|Defiens the time with the UTC offset for the specified place and date in the following format: +/-HHmm|+0500|
|A|Defines the section of the day in upper case letters|AM or PM|
|a|Defines the section of the day in lower case letters|am or pm|

#### Example
In the following sample code, both the standard and the localization formatting ways are shown.
```
<!--left out for brevity-->
<tr>
  <td alignment="right">Order Date:</td>
  <td>{{Declarations::order.orderDate; dateTimeFormat=DD.MM.YYYY}}</td>
</tr>
<tr>
  <td alignment="right">Delivery Date:</td>
  <td>{{Declarations::order.deliveryDate; dateTimeFormat=date}}</td>
</tr>
```

### DocumentProperties
The document properties are meta data of the generated PDF document. This information will not be printed

| Node / Attribute name  | Type  | optional | Annotation                              | Validations/Checks|
|:-----------------------|:------|:---------|:----------------------------------------|:------------------|
|title|String|yes|Defines the title of a document||
|author|String|yes|Defines the name of the author||
|subject|String|yes|Defines the subject of a document||
|creator|String|yes|Refers to the creator of a document||
|keywords|String|yes|Defines the keywords related to a document||
|producer|String|yes|Refers to the producer of a document||
|creationDate|String|yes|Refers to the date when a document is created. The default date is system generated||
|modDate|String|yes|Refers to the last modified date of a document||
|trapped|String|yes|Indicates whether a document is trapped by flagging||

### Example
```
<DocumentProperties>
  <Property key="keywords" value="{{Declarations::header.keyword}}"/>
  <Property key="title" value="A documentTitle"/>
</DocumentProperties>
```
