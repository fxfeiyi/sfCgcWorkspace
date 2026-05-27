  
# UserInterface (UI) Contract Definition

## Table of Content
- [Contract definition](#contract-definition)
  - [UI definitino contracts](#ui-definition-contracts)
    - [Page level](#page-level)
    - [Section level](#section-level)
    - [Area level](#area-level)
    - [UI control level](#ui-control-level)
- [UI patterns](#ui-patterns)
  - [Page level UI patterns](#page-level-ui-patterns)
      - [Single section page](#single-section-page)
      - [Single section dialog page](#single-section-dialog-page)
      - [Master detail section page](#master-detail-section-page)
      - [Multi section page](#multi-section-page)
      - [Split screen page](#split-screen-page)
  - [Section level UI patterns](#section-level-ui-patterns)
      - [Single area section](#single-area-section)
      - [Dashboard section](#dashboard-section)
      - [Tabbed View area section](#tabbed-view-area-section)
      - [Filtered view area section](#filtered-view-area-section)
  - [Area level UI patterns](#area-level-ui-patterns)
      - [Login area](#login-area)
      - [Welcome area](#welcome-area)
      - [Button grid area](#button-grid-area)
      - [Single element arae](#single-element-area)
      - [Grouped element area](#grouped-element-area)
      - [Filter element area](#filter-element-area)
      - [Card area](#card-area)
      - [Multi area](#multi-area)
  - [UI control level UI patterns](#ui-control-level-ui-patterns)
  - [Pattern syntax and semantics](#pattern-syntax-and-semantics)
    - [Top level element](#top-level-element)
    - [Inner level elements](#inner-level-elements)
- [UI description contract (Contract Reference)](#ui-description-contract-contract-reference)
  - [UIDescription](#uidescription)
  - [Page](#page)
  - [Section](#section)
    - [GroupElement Control](#groupelement-control)
  - [Area](#area)
  - [UI controls](#ui-controls)
    - [Calendar Control](#calendar-control)
    - [BreadCrumb Control](#breadcrumb-control)
    - [MediaList Control](#medialist-control)
    - [Checkbox Control](#checkbox-control)
    - [TimePicker Control](#timepicker-control)
    - [DatePicker Control](#datepicker-control)
    - [GoogleMap Control](#googlemap-control)
    - [GroupElement Control](#groupelement-control)
    - [AdvancedSearch Control](#advancedsearch-control)  
    - [GroupedList Control](#grouplist-control)
    - [Multi Selection Grouped List Control](#multi-selection-grouped-list-control)
    - [Multi Selection BreadCrumb Control](#multi-selection-breadcrumb-control)
    - [GroupedButtonList Control](#groupedbuttonlist-control)
    - [EmbeddedList Control](#embeddedlist-control)
    - [ImageButton Control](#imagebutton-control)
    - [Dropdown Control](#dropdown-control)
    - [ImageSelector Control](#imageselector-control)
    - [SelectionBox Control](#selectionbox-control)
    - [Stepper Control](#stepper-control)
    - [InputArea Control](#inputarea-control)
    - [InputAreaMultiLine Control](#inputareamultiline-control)
    - [TabSelector (implicit)](#tabselector-implicit)
    - [Welcome Control](#welcome-control)
    - [Lookup Control](#lookup-control)
    - [Scanner Control](#scanner-control)
    - [Option Bar Control](#option-bar-control)
    - [UIContainer Control](#uicontainer-control)
    - [Signature Control](#signature-control)
    - [UIPlugin Control](#uiplugin-control)
    - [MediaControl](#mediacontrol)
    - [CardContainer](#cardcontainer)
    - [NavigationMenuContainer](#navigationmenucontainer)
    - [General Control Sub Elements](#general-control-sub-elements)
  - [Events](#event-gernal)
    - [Param](#param)
    - [FilterParam](#filterparam)
    - [FilterFunction](#filterfunction)
    - [SelectArea](#selectarea)
    - [ValidateAndSelectArea](#validateandselectarea)
  - [List items](#list-items)
  - [Items](#items-1)
    - [ItemListLayout](#itemlistlayout)
  - [Menus](#menus)
    - [Application menu](#application-menu)
    - [MenuItem](#menuitem)

## Contract Definition
Contracts are design time objects that use XML to describe certain aspects of the application. Contracts act as device independent, technology independent and form factor independent design documents that need to be translated into runtime objects to be used in the framework or application.

## UI definition contracts
There are two types of contracts for the UI: UI patterns and UI definition contracts. This document describes the use, syntax and semantics of both contract types.  
UI contracts describe the UI in different layers, each focusing on different design aspects. The following chapters describe these layers and how they are represented at runtime.

### Page level
A page is the top level of the UI describing a logical unit belonging to a specific use case. At runtime a page can cover multiple display screens, depending on the device type and device orientation. Pages contain one or more sections.

### Section level
A section is a part of a page that is never split across multiple display screens at runtime. A section can cover only part of a display screen or all of it. Sections encapsulate smaller logical units than pages. Sections contain one or more areas.

### Area level
An area is a part of a section. Areas are logical groups of UI controls and encapsulate certain aspects of the use case the UI description is used for.  
Areas contain one or more UI controls

### UI control level
A UI control is any interface component displayed to the user. This can range from simple labels to complex map or camera controls.  
UI controls define elements that are associated with them like touch events for buttons or text changed events for text fields. The UI description contracts map these technical events to logical events that are handled by the UI controller or application flow controller. There are two sub-types of UI controls: Containers and components. Containers contain other containers or components, while components are at the lowest hierarchy level in the UI and are atomic in nature.

## UI patterns
UI patterns are the basis of the UI description. UI patterns describe recurring features, layouts and controller structures. UI patterns exist for all the levels described in chapter 1.1. The following chapters describe the UI patterns used in the NextGen mobile framework before describing the UI pattern syntax and semantics in more detail. UI patterns are part for the framework and not meant to be edited by or for projects or customers.

## Page level UI patterns
The following page level UI patterns are defined for the NextGen mobility framework.

### Single section page
The single section page pattern describes a situation where a single section fills the entire page. This section is named "masterSection". This indirectly states that the whole page will be visible on all devices and never be split to multiple device screens. No additional logic is contained in this pattern. This pattern supports one child of "section" level only.

### Single section dialog page
The single section dialog page pattern is similar to the single section page pattern, but the page is displayed in a pop-up dialog instead. This pattern supports one child of "section" level only.

### Master detail section page
The master detail section page pattern is used, when data in one section influences data in another section. The page using this pattern has exactly two sections, one named "MasterSection" and the other named "DetailSection". This pattern also includes two data sources that need to be linked to data in the process context. Whenever the data in the master data source changes, a special event is thrown to notify the detail data source of the change. A typical use case for this is pattern is a list view that contains overview data and a detail section that contains detailed information about the selected item. This pattern requires two children of "section" level.

### Multi section page
The multi section page pattern consits of two vertical sections with no dependencies between them like in the master detail pattern. Its purpose is to display or hide dynamically a second section with a multiarea in it. This pattern requires one or more children of "section" level.

### Split Screen page
The split screen section page pattern consist of exactly two sections side by side named "LeftSection" and "RightSection". It shows two visualizations of a list on a phone formfactor, e.g. to enable the application user to see the map in an Agenda also on phones.On phones a new entry inside the context menu is available to switch between the two views. This pattern requires two children of "section" level.

### Section level UI patterns
The following section level UI patterns are defined for the NextGen mobility framework.

### Single area section
The single area section pattern states that there is just a single area named "MainArea" inside the section. No additional logic is contained in this pattern. This pattern supports one child of "area" level only.

### Dashboard section
The dashboard section pattern is a specialized pattern that is solely used in the main menu screen of the application. It can only contain certain a welcome area and a button grid area. This pattern requires two children of "area" level, one to contain the "Welcome" area, that has to use the "WelcomeArea" pattern and one to contain the dashboard buttons, which has to use the "ButtonGridArea" pattern.

### Tabbed View area section
The tabbed area section pattern describes a section that contains multiple areas all arranged as tabs in a single section. The section comes with a number of tab selection controls that let the user switch between the areas contained in the section. Only one area is visible at all times and this area covers the whole section minus the space needed for the tab selectors. Tabbed area sections can be customized,  so that  have selected visibility and editability rights. This pattern requires two or more children of "area" level. One has to use the "TabElementArea" pattern, the others can use any area pattern

### Filtered view area section
The filtered view area section pattern is similar to the master data section page pattern as it too describes a situation where data in one element influences data in another. The differences between these patterns are that the filtered view area section is a section pattern rather than a page pattern and that the filtered view area section pattern does not handle a master detail relationship but is used to filter data in one view based on the selection in another view. The filtered view area section contains two areas, the filter area and the view area. The filter area must be a filter element area. It also defines two data sources which are usually lists and it defines filter properties for the view data source. When the filter data source changes, this data is used to filter the information in the view data source. A typical use case could be that selecting an item in one list filters the content visible in another list. This pattern requires two children of "area" level. One to contain the filter and has to use the "FilterElementArea" pattern and one to contain the data to be filtered.

### Area level UI patterns
The following area level UI patterns are defined for the NextGen mobility framework.

### Login area
The login area pattern is a specialized pattern that describes the login screen and is only used there. It can only contain the UI controls necessary to authenticate a user. This pattern requires two "control" level children. A group element to contain the login fields and an image button

### Welcome area
The welcome area pattern is a specialized pattern that is only used in the main menu screen. It contains a welcome message UI control that displays a welcome message, the company logo, the user name and an image. This pattern supports only one child of "control" level, which needs to be the "Welcome" control

### Button grid area
The button grid area pattern is used when multiple buttons need to be arranged in a grid. It only contains buttons as UI controls and auto-arranges them in a grid that fits on the device screen. If more buttons are added than fit on one device screen, the button grid area automatically manages navigation between the correct number of screens needed to show all the buttons in the grid. This pattern supports one or more "control" level children, that need to be "ImageButtons"

### Single element area
The single element area pattern describes a situation where a single UI control is positioned inside the area.  
No additional logic is contained in this pattern. This pattern supports only one child of "control" level.

### Grouped element area
The grouped element area pattern describes a situation where multiple UI controls need to be arranged in groups. Each group can contain one or more UI controls and the grouped element area pattern contains support for naming the groups and adding UI controls to the groups. Groups are usually displayed inside a border or similar UI elements to separate them visually in the UI and group names are usually displayed in the UI to enhance the user experience. This pattern supports one or more children of control type. Valid controls include "ActionBar", "EmbeddedList", and "GroupElement"

### Filter element area
The filter element area is a specialized single element area that can act as a filter in the filtered view area section. This pattern supports only one child of "control" level, which needs to be an "ImageSelector"

### Card area
The card area can be used to arrange the CardContainers by dividing the available area into columns. This pattern supports one or more children of "control" level, which need to be "CardContainers", "NavigationMenuContainer" or "SyncCardContainer".

### Multi area
The MultiArea is used to display multiple areas in one place, allowing to switch between the areas and thus allowing to display different data in the same area, e.g. an overview and details for one element. This pattern supports one or more children of "area" level.

## UI control level UI patterns.
UI control level UI patterns describe templates used in UI controls. This can range from image buttons to list elements and each pattern is custom tailored to the control it is used by.

## Pattern syntax and semantics

### Top level element
The top level element of each pattern states which type of pattern is defined. This can be any level described in this chapter ranging from page to UI control.

### Inner level elements
The inner level elements are dependent on the pattern described and are a blueprint or template for the UI description element they are used in. The elements contained are named and all events linked to the pattern are defined. If special data stores are needed for the pattern, these are described as well.

  
## UI description contract (Contract Reference)
UI description contracts define the different pages used in an application. They use UI patterns to describe recurring features and they describe the general composition of an UI. As with all contract files, UI description contracts are platform and platform version independent, technology independent, device independent and device orientation independent. UI description contracts describe the patterns to use, the UI controls visible, the logical events thrown by the UI through user interaction and they manage the data binding. UI description contracts are not part of the UI framework, but their syntax and semantics are. The following chapters describe these in more detail. This document does not describe how to transform the design time contracts into runtime artifacts, since this is part of the generator design.

## UIDescription
The UIDescription element is the top element of any UI description contract. It contains meta information about the contract like its name. The following attributes are available in the UIDescription element.

| Name  |Name in property grid | Description | Values / Pattern | Required | Validation / Checks |
|:------|:---------------------|:------------|:-----------------|:---------|:--------------------|
|name| Name | Application wide unique identifier for the contract| \<DomainName>::\<ContractName> |yes| uniqueness in solution/application|
|schemaVersion| n.a.|Defines the Version of the XML Syntax for UI Contracts|x.x.x.x|No||
|xmlns| n.a.|Defines the filename of the relevant XML Schema Definition|\<filename>.xsd|No| existence of .xsd file|

### Example
```
<UIDescription name="Application::LoginUI" schemaVersion="0.0.0.5" xmlns="UISchema.xsd">
  
</UIDescription>
```

## Page
This chapter describes the page level elements available. Pages can contain a PageHeader and one or more Sections depending on the PagePattern. The following PagePatterns are available:

| Name | Description | Menu Item |
|:-----|:------------|:----------|
|SingleSectionPage|only one section allowed| yes|
|SingleSectionDialogPage|only one section allowed| yes|
|MultiSectionPage|multiple sections allowed| yes|
|MasterDetailSectionPage|one master and one detail section allowed| yes|
|SplitScreenPage|one left and one right section allowed| yes|

The following attributes are available in each Page element, **except** 'Navigation' does not exist for 
SplitScreenPage
---
|Name in XML|Description|Values / Pattern|Required|Validation/Checks|
|:----------|:----------|:---------------|:-------|:----------------|
|pagePattern|Defines the Pattern of the Page|\<PagePattern>|yes||
|see \<PageHeader>|see \<PageHeader>|<ul><li>Binding<li>Label<li>None</ul>|yes||

Additional attributes MultiSectionPage
---
|Name in XML|Description|Values / Pattern|Required|Validation/Checks|
|:----------|:----------|:---------------|:-------|:----------------|
|masterSectionFlex|Display ratio of the Master section. This is a mendatory field if multiSectionFex is defined.|int|yes|valid value (range)|
|multiSectionFlex|Display ratio of the multi section. This is a mendatory field if masterSectionFex is defined.|int|yes|valid value (range)|
  
Additional attributes MasterDetailSectionPage
---
|Name in XML|Description|Values / Pattern|Required|Validation/Checks|
|:----------|:----------|:---------------|:-------|:----------------|
|masterSectionFlex|Display ratio of the Master section. This is a mendatory field if detailSectionFex is defined.|int|yes| valid value (range)|
|detailSectionFlex|Display ratio of the detail section. This is a mendatory field if masterSectionFex is defined.|int|yes| valid value (range) |
|selectFirstItemInList|Prevents the selection of the first List Entry (for Tablet only)|Boolean|no|
|switchToDetail|Prevents flipping to the Detail Area (for Phones only)|Boolean|no|

Additional attributes SplitScreenPage
---
|Name in XML|Description|Values / Pattern|Required|Validation/Checks|
|:----------|:----------|:---------------|:-------|:----------------|
|leftSectionFlex|Display ratio of the left section. This is a mandatory field if rightSectionFex is defined.|int|yes|valid value (range)|
|rightSectionFlex|Display ratio of the detail section. This is a mandatory field if leftSectionFex is defined.|int|yes|valid value (range)|

Additional attributes SingleSectionDialogPage
---
|Name in XML|Description|Values / Pattern|Required|Validation/Checks|
|:----------|:----------|:---------------|:-------|:----------------|
|onBackDiscard|changes the Discard Handling for Wizards|Boolean|no (default FALSE)|


## Examples
```
SINGLE SECTION PAGE
<UIDescription name="Example::SingleSectionPageUI" schemaVersion="0.0.0.5" xmlns="UISchema.xsd">
 <Page pagePattern="SingleSectionPage" />
</UIDescription>
  
  
SINGLE SECTION DIALOG PAGE
<UIDescription name="Example::SingleSectionDialogPageUI" schemaVersion="0.0.0.5" xmlns="UISchema.xsd">
 <Page pagePattern="SingleSectionDialogPage" onBackDiscard="true"/>
</UIDescription>
  
  
MULTI SECTION PAGE
<UIDescription name="Example::MultiSectionPageUI" schemaVersion="0.0.0.5" xmlns="UISchema.xsd">
 <Page pagePattern="MultiSectionPage" navigation="Off" masterSectionFlex="0" multiSectionFlex="0">
  <Section sectionName="SingleAreaSection_1" sectionPattern="SingleAreaSection" flex="2" directlyVisible="true" />
  <Section sectionName="SingleAreaSection_2" sectionPattern="SingleAreaSection" flex="1" directlyVisible="true" />
 </Page>
</UIDescription>
  
  
MASTER DETAIL SECTION PAGE
<UIDescription name="Example::MasterDetailSectionPageUI" schemaVersion="0.0.0.5" xmlns="UISchema.xsd" layoutType="blank">
 <Page pagePattern="MasterDetailSectionPage" navigation="Off" masterSectionFlex="40" detailSectionFlex="60" selectFirstItemInList="true" switchToDetail="true">
  <Section sectionName="masterSection" sectionPattern="SingleAreaSection" />
  <Section sectionName="detailSection" sectionPattern="SingleAreaSection" />
</Page>
</UIDescription>
  
SPLIT SCREEN PAGE
<UIDescription name="Call::AgendaUI" schemaVersion="0.0.0.5">
  <Page pagePattern="SplitScreenPage" leftSectionFlex="1" rightSectionFlex="1">
    <PageHeader titleBinding="ProcessContext::currentDate">
      <SplitScreenButtons>
        <LeftSectionButton>
          <Bindings>
            <Resource target="Text" type="Label" id="MapLabelId" defaultLabel="Map" />
            <Resource target="Icon" type="Image" id="MapIcon" />
          </Bindings>
        </LeftSectionButton>
        <RightSectionButton>
          <Bindings>
            <Resource target="Text" type="Label" id="AgendaLabelId" defaultLabel="Agenda" />
            <Resource target="Icon" type="Image" id="AgendaIcon" />
          </Bindings>
        </RightSectionButton>
      </SplitScreenButtons>   
    </PageHeader>
    <Section sectionName="leftSection" sectionPattern="SingleAreaSection">...</Section>
    <Section sectionName="rightSection" sectionPattern="SingleAreaSection">...</Section>
  </Page>
</UIDescription>
```
  
## PageHeader

The PageHeader element is used to bind the Titel of the Page. If no PageHeader is defined the Page will not display the HeaderBar with the Back button. The Page Header can contain MenuItems.

### Attributes:
|Name|Description|Values/Pattern|Required|
|:---|:----------|:-------------|:-------|
|titleBinding|Used to bind the PageTitle to the PageHeaderSection (Process Binding) This attribute could be optional if the PageHeader defines a Title target resource binding.|\<Context>::\<Variable>|Yes|

|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|see \<Bindings>|If \[Title Type\] = Binding|string|yes||
|see \<Bindings>|If \[Title Type\] = Label|string|yes||
|see \<Bindings>|If \[Title Type\] = Label|string|yes||
|bindingMode|mode of binding|predefined string \[ONE\_TIME\]|n.a.||
  

## Bindings
### Examples
```
LABEL
<PageHeader>
 <Bindings>
  <Resource target="title" type="Label" id="value_labelId" defaultLabel="value_defaultLabel" bindingMode="ONE_TIME" />
 </Bindings>
</PageHeader>
  
  
BINDING
<PageHeader titleBinding="value" />
```

The **PageHeader** in **SplitScreenPage** has an additional child node 'SplitScreenButtons' with two children 'LeftSectionButton' and 'RightSectionButton'. Each of them has a Bindings-Node to maintain a label and an image.  
Hierarchy, e.g. \<PageHeader>\<SplitScreenButtons>\<LeftSectionButton>\<Bindings>\<Resource>

In PropertyGrid are the two groups 'Left Section Button' and 'Right Section Button'. Each group has the following properties:

|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|defaultLabel|Default label of the button|string|no||
|id|Id of the label|string|no||
|id|The image to display in the button|Id of any image resource available in the project|no, defaults to no image displayed||

### Example
```
<SplitScreenButtons>
  <LeftSectionButton>
    <Bindings>
    <Resource target="Text" type="Label" id="MapLabelId" defaultLabel="Map" />
    <Resource target="Icon" type="Image" id="MapIcon" />
   </Bindings>
  </LeftSectionButton>
  <RightSectionButton>
   <Bindings>
    <Resource target="Text" type="Label" id="AgendaLabelId" defaultLabel="Agenda" />
    <Resource target="Icon" type="Image" id="AgendaIcon" />
   </Bindings>
  </RightSectionButton>
 </SplitScreenButtons>
 ```
  

## Header
The HeaderLine control represents the new section of controls. It will be child element of \<Page pagePattern="SingleSectionPage | MultiSectionPage | MasterDetailSectionPage | SplitScreenPage"> and should be created below PageHeader (optional and maximum one appearance). 

The HeaderLine control can contain any number of image buttons and dropdowns.

### Example
```
<UIDescription name="Test::SingleSectionUI" schemaVersion="0.0.0.5" xmlns="UISchema.xsd">
  <Page pagePattern="SingleSectionPage">
    <HeaderLine name="Header">
      <ImageButton name="testImage">
         
      </ImageButton>
      <Dropdown name="testDropdown">
         
      </Dropdown>
    </HeaderLine>
    <Section sectionName="singleAreaSection" sectionPattern="SingleAreaSection">
      <Area areaName="singleElementArea" areaPattern="SingleElementArea">
        <BreadCrumbControl name="" searchBarPlacement="HeaderLine" >
           
        </BreadCrumbControl>
      </Area>
    </Section>
  </Page>
</UIDescription>
```

The new optional attribute "searchBarPlacement" in used in the example is allowed in: GroupedList, MultiSelectionGroupedList, BreadCrumbControl and MultiSelectionBreadCrumbControl.

## Section

This chapter describes the section level elements available.  
The Section element defines generic section that has the following attributes and acts as a base class for all specialized sections.

|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|sectionName|Identification of this section|"Main"|yes||
|sectionPattern|Defines the pattern to use for this section|"DashboardSection"|yes||
|showInfoArea|predefined attribute for DashboardUI|Boolean|only for DashboardSection Pattern||
|showPasswordChangeButton|predefined attribute for DashboardUI|Boolean|only for DashboardSection Pattern| |
|showLogOffButton| predefined attribute for DashboardUI|Boolean|only for DashboardSection Pattern| |

## GroupElement Control
Child Elements are one or more Areas depending on the SectionPattern  
The following SectionPatterns are available:
  
|Section Name|Description|
|:-----------|:----------|
|DashboardSection|The following child elements are available for the DashboardSection:<ul><li>Area with areaName "WelcomeArea" and areaPattern "welcomeArea"<li>Area with areaName "ButtonGridArea" and areaPattern "buttonGridArea"</ul>|
|LoginSection|The following child elements are available for the LoginSection:<ul><li>Area with areaName "LoginArea"<li>Area with areaName "InfoArea"</ul>|
|FilteredViewAreaSection|The following child elements are available for the FilteredViewAreaSection:<ul><li>Area with areaName "filterArea" and areaPattern "FilterElementArea"<li>Area with areaName "viewArea" and areaPattern SingleElementArea" or "GroupedElementsArea"</ul>|
|SingleAreaSection| The following child elements are available for the SingleAreaSection:<ul><li>Area with areaName mainArea" and areaPattern "SingleElementArea" or "GroupedElementsArea"<ul>|
|TabbedViewAreaSection|The following child elements are available for the TabbedViewAreaSection:<ul><li>Area with reaName "tabArea" and areaPattern "TabElementArea"<li>Areas for every Tab</ul>|

### Example
```
<Section sectionName="[SectionName]" sectionPattern="DashboardSection">
<Section sectionName="[SectionName]" sectionPattern="LoginSection">
<Section sectionName="[SectionName]" sectionPattern="FilteredViewAreaSection">
<Section sectionName="[SectionName]" sectionPattern="SingleAreaSection">
<Section sectionName="[SectionName]" sectionPattern="TabbedViewAreaSection">
```

## Area
This chapter describes the area level elements available.

The following attributes are available in the Area element.
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|areaName|Identification of this area|string|yes| uniqueness in contract|
|areaPattern|Defines the pattern to use for this area|area pattern|yes||
|lazyLoading|Some Area types like MultiArea support lazy loading. This feature could be enabled by setting the attribute **lazyLoading** to true.|Boolean|no||
  
Child Elements are one or more Control Elements depending on the AreaPattern  
The following AreaPatterns are available:

|Area Name|Description|
|:--------|:----------| 
|WelcomeArea|The WelcomeArea element defines a special area that contains a welcome message for the user. It is only used in the main menu screen. The only available child element is the WelcomeMessage. No special attributes are available in the LogoutArea element. (**notice**: the WelcomeArea is not producible via ContextMenu. It is directly dependent on parent "DashboardSection".)|
|LoginArea|The LoginArea is a special Area of the LoginSection. (**notice**: the LoginArea is not producible via ContextMenu. It is directly dependent on parent "LoginSection".)|
|GroupedElementsArea|The GroupedElementsArea is a special area used to contain GroupElements. No special attributes are available for this area. The FilterArea can contain any elements as children.|
|FilterElementArea|The FilterElementArea is a special area used to contain the filter elements used in the filtered view pattern. No special attributes are available for this area. The FilterArea can contain any elements as children.|
|ButtonGridArea|The ButtonGridArea defines a grid that contains any number of buttons. The layout of the grid and the number of rows and columns depends on the device, device OS and device orientation. No special attributes are available for this area. The ButtonGridArea can contain any number of ImageButton elements as children.|
|SingleElementArea|The SingleElementArea describes an area which contains one arbitrary UI control.|
|TabElementArea|The TabElementArea describes an area used in a tabbed view area pattern. It contains the TabSelector control. No special attributes are available in the TabArea element. (**notice**: the TabElementArea is not producible via ContextMenu. It is directly dependent on parent "TabbedViewAreaSection".)|
|MultiArea|The MultiArea Pattern could be used to define an Area that contains many Areas from different types. To switch between the Areas you could make usage of special event handling.|
|Card|The card area can be used to arrange the CardContainers by dividing the available area into columns.|

### Example
```
SPECIAL AREAS
<Area areaName="welcomeArea" areaPattern="WelcomeArea">
<Area areaName="mainArea" areaPattern="LoginArea">
  
AREAS
<Area areaName="[AreaName]" areaPattern="GroupedElementsArea">
<Area areaName="[AreaName]" areaPattern="FilterElementArea">
<Area areaName="[AreaName]" areaPattern="ButtonGridArea">
<Area areaName="[AreaName]" areaPattern="SingleElementArea">
<Area areaName="[AreaName]" areaPattern="TabElementArea">
<Area areaName="[AreaName]" areaPattern="MultiArea">
```

## UI controls
This chapter describes the UI control elements available.

## Calendar Control
The Calendar Control element defines special calendar view that contains date related data.  
Following attributes are available for the Calendar element.

|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identification of Calendar|string|yes| uniqueness (contract)|
|dataSource||string|yes|ListObject Reference|
|dateFromAttribute||string|||
|dateThruAttribute||string|||
|timeFromAttribute||string|||
|timeThruAttribute||string|||
|allDayAttribute||string|||
|firstLine||string|||
|secondLine||string|||
|backgoundColorAttribute||string|||

### ChildNodes of CalendarControl

|Node Name|Description|
|:--------|:----------|
|Bindings||
|Items||
|Settings||

  
CalendarControl \<Binding> node \[count 2\]:

#### DateRangeStartDate Binding
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string|(grey lightbulb)||
|binding|(grey lightbulb)|string|(grey lightbulb)||
|bindingMode|(grey lightbulb)|string [ONE_WAY]|(grey lightbulb)||
 
#### ShowCalendarWeek Binding (boolean, used to control display of calendar week at the top of the control)
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string|(grey lightbulb)||
|binding|(grey lightbulb)|string|(grey lightbulb)||
|bindingMode|(grey lightbulb)|string [ONE_WAY]|(grey lightbulb)||

#### CalendarControl \<Items> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|(grey lightbulb)|string [Items]|yes||
|itemPattern|(grey lightbulb)|string [calendarItemPattern]|yes||

#### ChildNodes of CaIendarControl Items:
|Node Name|Description|
|:--------|:----------|
|ContextMenu| see **passage "ContextMenu"**|
|Bindings||

#### CalendarControl \<Items>\<Bindings>\<Binding> node \[count n\]:  
(notice: represents Attribute of CalendarControl)
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string|(grey lightbulb)||
|type|(grey lightbulb)|string|(grey lightbulb)||
|binding|(grey lightbulb)|string|(grey lightbulb)||
|bindingMode|(grey lightbulb)|string [ONE_WAY]|(grey lightbulb)||
|defaultLabel (if [Type] = "Label"]|(grey lightbulb)|string|(grey lightbulb)||
|id  (if [Type] = "Label"]|(grey lightbulb)|string|(grey lightbulb)||
|format  (if [Type] = "Decimal"]|(grey lightbulb)|int|(grey lightbulb)||
  
 CalendarControl \<Settings> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|dataSource|(grey lightbulb)|string|(grey lightbulb)| availability|
|KeyAttribute|(grey lightbulb)|string|(grey lightbulb)||
|ValueAttribute|(grey lightbulb)|string|(grey lightbulb)||

### Events
Following events are available for Calendar elements.
|Event Name|Fired when|Required|
|:---------|:---------|:-------|
|ItemSelectedEvent|User taps any item in the calendar|no|
|CalendarDropEvent||no|
|CalendarItemMoveEvent||no|
|CalendarItemOverlappingOpeningEvent||no|
|CalendarDateRangeChangedEvent||no|
|CalendarItemResizeEvent||no|
|CalendarLongTapEvent||no|
|ContextOpeningEvent||no|
|ContextSelectedEvent||no|

### Example
```
<CalendarControl name="cc1" dataSource="itemsDataSource" dateFromAttribute="dateFrom" dateThruAttribute="dateThru" timeFromAttribute="timeFrom" timeThruAttribute="timeThru" allDayAttribute="allDay" firstLine="firstLine" secondLine="secondLine" backgroundColorAttribute="bgcAttribute">
    <Bindings>
        <Binding target="DateRangeStartDate" binding="dateRangeBinding" bindingMode="ONE_WAY" />
    </Bindings>
    <Items name="Items" itemPattern="calendaritemPattern">
    <ContextMenu>
        <Bindings>
        <Binding target="DataSource" binding="source" bindingMode="ONE_WAY" />
        </Bindings>
        <Items name="ContextMenuItems">
        <Bindings>
            <Binding target="Icon" type="Image" binding="iconBinding" />
            <Binding target="Text" type="Label" binding="textBinding" />
            <Binding target="Editable" type="Editable" binding="editableBinding" />
            <Binding target="Visible" type="Visible" binding="vsibleBinding" />
        </Bindings>
        </Items>
    </ContextMenu>
    <Bindings>
        <Binding target="CalendarItemAttribute1" type="Text" binding="binding" bindingMode="ONE_WAY" />
    </Bindings>
    </Items>
    <Settings dataSource="dataSource" KeyAttribute="keyAttribute" ValueAttribute="valueAttribute" />
</CalendarControl>
```

### BreadCrumb Control

Description:  
Following attributes are available for the Calendar element.

|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identifier of control|string|yes| uniqueness (contract)|
|searchable|(grey lightbulb)|boolean|(grey lightbulb)||
|groupBy|(grey lightbulb)|string|(grey lightbulb)||
|sortBy|(grey lightbulb)|string|(grey lightbulb)||
|master|(grey lightbulb)|boolean|(grey lightbulb)||
|dataSource|(grey lightbulb)|string|(grey lightbulb)||
|hasBorder|(grey lightbulb)|boolean|(grey lightbulb)||
|sortInsideGroupBy|(grey lightbulb)|Any attribute of the attached data|(grey lightbulb)||
|sortDirectionInGroup|(grey lightbulb)|string[ASC | DESC]|(grey lightbulb)||
|searchBarPlacement|(grey lightbulb)|string[HeaderLine]|(grey lightbulb)||
|numberpadDefaultField|(grey lightbulb)|Any attribute of the attached data||
|showPreviousNextEnter|(grey lightbulb)|boolean||

#### ChildNodes of BreadCrumbControl:
|Node Name|Description|
|:--------|:----------|
|Hierarchy|(grey lightbulb)|
|Items|(grey lightbulb)|
|Bindings.Binding|(grey lightbulb) |

#### BreadCrumbControl \<Items> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|-|string [Items]|yes||
|itemPattern|(grey lightbulb)|string|yes||
     
#### BreadCrumbControl\<Bindings>\<Binding> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [DynamicallyGroupBy]|no||
|type|(grey lightbulb)|string [Text]|no||
|binding|(grey lightbulb)|string|no||
     
#### ChildNodes of BreadCrumbControl\<Items>:
|Node Name|Description|
|:--------|:----------|
|ItemListLayout|property "List Layout" represents node "ItemListLayout" in contract XML and includes valid XML structure.|
|ContextMenu|see passage "ContextMenu"|

#### Hierarchy
Following attributes are available for Hierarchy element.

|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identifier|string|yes| (grey lightbulb)|
|labelAttribute|(grey lightbulb)|string|(grey lightbulb)||

##### ChildNodes of Hierarchy:
|Node Name|Description|
|:--------|:----------|
|Bindings||
|Events||
|DataSources||

#### ChildNodes of Hierarchy\<Bindings>
|Node Name|Description|
|:--------|:----------|
|Binding||
|Resource \[if RootLabel.Type=Label\]||

  
#### Hierarchy\<Bindings>\<Binding> node \[1-3\]:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [RootLabel; ShowCategory; AddItem]|(grey lightbulb)||
|type|(grey lightbulb)|string [Text]|(grey lightbulb)||
|binding|(grey lightbulb)|string|(grey lightbulb)||
|bindingMode|(grey lightbulb)|string [ONE_WAY]|(grey lightbulb)||
     
#### Hierarchy\<Bindings>\<Resource> node \[0-1\]: 
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [RootLabel]|(grey lightbulb)||
|type|(grey lightbulb)|string [Label]|(grey lightbulb)||
|id|(grey lightbulb)|string|(grey lightbulb)||
|defaultLabel|(grey lightbulb)|string|(grey lightbulb)||
|bindingMode|(grey lightbulb)|string [ONE_WAY]|(grey lightbulb)||

#### Hierarchy Events
Following events are available for Hierarchy elements.
|Event Name| Fired when| required |
|:---------|:----------|:---------|
|ItemSeletedEvent|(grey lightbulb)|(grey lightbulb)|
|HierarchyBackEvent|(grey lightbulb)|(grey lightbulb)|

#### Hierarchy DataSources\<DataSource>
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|(grey lightbulb)|string|(grey lightbulb)||
|keyAttribute|(grey lightbulb)|string|(grey lightbulb)||
|refKeyAttribute|(grey lightbulb)|string|(grey lightbulb)||

### Example
```
<BreadCrumbControl name="BeadCrumbCtrl" searchable="true" groupBy="groupBy" sortBy="sortBy" master="true" numberPadDefaultField = "quantity" showPreviousNextEnter = "true"  dataSource="dataSource" hasBorder="true">
  <Hierarchy name="hierarchyName" labelAttribute="labelAttribute">
    <Bindings>
      <Resource target="RootLabel" type="Label" id="labelId" defaultLabel="defaultLabel" bindingMode="ONE_TIME" />
      <Binding target="ShowCategory" type="Text" binding="showCategoryBinding" BindingMode="ONE_WAY" />
      <Binding target="AddItem" type="Text" binding="addItemBinding" BindingMode="ONE_WAY" />
    </Bindings>
    <Events>
      <ItemSelectedEvent event="ise">
        <Params>
          <Param name="id" value=".id" />
        </Params>
      </ItemSelectedEvent>
      <HierarchyBackEvent event="hbe">
        <Params>
          <Param name="id" value=".id" />
        </Params>
      </HierarchyBackEvent>
    </Events>
  </Hierarchy>
  <Items name="Items" itemPattern="itemPattern">
    <ItemListLayout>
      <xml />
    </ItemListLayout>
    <ContextMenu>
      <Bindings>
        <Binding target="DataSource" binding="ctxMenuSource" bindingMode="ONE_WAY" />
      </Bindings>
      <Items name="ContextMenuItems">
        <Bindings>
          <Binding target="Icon" type="Image" binding="iconBinding" />
          <Binding target="Text" type="Label" binding="textBinding" />
          <Binding target="Editable" type="Editable" binding="editableBinding" />
          <Binding target="Visible" type="Visible" binding="visibleBinding" />
        </Bindings>
      </Items>
    </ContextMenu>
  </Items>
</BreadCrumbControl>
```

## MediaList Control
The MediaListControl element defines.... (grey lightbulb)

Following attributes are available for MediaListControl element:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identifier of control|string|yes| uniqueness (contract)|
|disabled|-|boolean|no| (grey lightbulb)|
|dataSource|(grey lightbulb)|string|(grey lightbulb)| availability|

### ChildNodes of MediaListControl
|Node Name|Description|
|:--------|:----------|
|Bindings|(grey lightbulb)|
|Events|(grey lightbulb)|
|Items|(grey lightbulb)|

### ChildNodes of MediaListControl\<Bindings>
|Node Name|Description|
|:--------|:----------|
|Bindings|(grey lightbulb)|

### MediaListControl\<Bindings>\<Binding>  node [count 2-4]:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string|(grey lightbulb)||
|type|(grey lightbulb)|string|(grey lightbulb)||
|binding|(grey lightbulb)|string|(grey lightbulb)||
|bindingMode|(grey lightbulb)|string [ONE_WAY]|(grey lightbulb)||

### MediaListControl Events
|Event Name| Fired when| required |
|:---------|:----------|:---------|
|ContextOpeningEvent||no|
|ContextSelectedEvent||no|

### ChildNodes of Items
|Node Name|Description|
|:--------|:----------|
|ContextMenu|see passage: "ContextMenu"|

### Example
```
<MediaListControl name="MediaListCtrl" disabled="false" dataSource="dataSource">
    <Bindings>
        <Binding target="MediaPath" type="Text" binding="mediaPathBinding" bindingMode="ONE_WAY" />
        <Binding target="Description" type="Text" binding="descriptionBinding" bindingMode="ONE_WAY" />
        <Binding target="Type" type="Text" binding="typeBinding" bindingMode="ONE_WAY" />
    </Bindings>
</MediaListControl>
```

## Checkbox Control
The Checkbox element defines a checkbox UI control that can have a label and can be checked or unchecked.

Following attributes are available for the Checkbox element.

|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identification of this Checkbox|string|yes||
|disabled|-|boolean|no||

Following data and resource bindings are available for Checkbox elements.
ChildNodes of Checkbox\<Bindings>

|Node Name|Description|
|:--------|:----------|
|Resource|(grey lightbulb)|
|Binding|(grey lightbulb)|

Checkbox\<Bindings>\<Resource> node:

|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [Label]|(grey lightbulb)||
|type|(grey lightbulb)|string [Label]|(grey lightbulb)||
|id|(grey lightbulb)|string|(grey lightbulb)||
|defaultLabel|(grey lightbulb)|string|(grey lightbulb)||

Checkbox\<Bindings>\<Binding> node:

|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [checkedValue]|(grey lightbulb)||
|binding|(grey lightbulb)|string [valueBinding]|(grey lightbulb)||
|bindingMode|(grey lightbulb)|string [ONE_WAY]|(grey lightbulb)||

## Example
```
<CheckBox name="CheckboxCtrl" disabled="true">
  <Bindings>
    <Resource target="Label" type="Label" id="labelId" defaultLabel="defaultLabel" />
    <Binding target="checkedValue" binding="valueBinding" bindingMode="ONE_WAY" />
  </Bindings>
</CheckBox>
```

## TimePicker Control
The TimePickerControl element defines a special UI control that lets the user select time.
Following attributes are available for the DateTimePicker element.

|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identification of this TimePicker|Any string|yes||
|disabled|-|Boolean|no, defaults to false||

Bindings\<Binding> node:

|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [Value]|(grey lightbulb)||
|binding|(grey lightbulb)|string|(grey lightbulb)||
|bindingMode|(grey lightbulb)|string [ONE_WAY/TWO_WAY/ONE_TIME]|(grey lightbulb)||

Bindings\<Resource> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [Label]|(grey lightbulb)||
|type|(grey lightbulb)|string [Label]|(grey lightbulb)||
|defaultLabel|(grey lightbulb)|string|(grey lightbulb)||
|id|(grey lightbulb)|string|(grey lightbulb)||

## Example
```
<TimePickerField name="TimePickerCtrl" disabled="false">
  <Bindings>
    <Resource target="Label" type="Label" defaultLabel="defaultLabel" id="labelId" />
    <Binding target="Value" binding="valueBinding" bindingMode="TWO_WAY" />
  </Bindings>
</TimePickerField>
```

## DatePicker Control
The DatePickerControl element defines a special UI control that lets the user select a date value.
Following attributes are available for the DatePicker element.

|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identification of this DatePicker|string|yes||
|disabled|-|boolean|no||

Bindings\<Binding> node:

|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [Value]|(grey lightbulb)||
|binding|(grey lightbulb)|string|(grey lightbulb)||
|bindingMode|(grey lightbulb)|string [ONE_WAY/TWO_WAY/ONE_TIME]|(grey lightbulb)||

Bindings\<Resource> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [Label]|(grey lightbulb)||
|type|(grey lightbulb)|string [Label]|(grey lightbulb)||
|defaultLabel|(grey lightbulb)|string|(grey lightbulb)||
|id|(grey lightbulb)|string|(grey lightbulb)||

## Example 
```
<DatePickerField name="DatePickerCtrl" disabled="false">
  <Bindings>
    <Resource target="Label" type="Label" defaultLabel="defaultLabel" id="labelId" />
    <Binding target="Value" binding="valueBinding" bindingMode="TWO_WAY" />
  </Bindings>
</DatePickerField>
```

## GoogleMap Control
The GoogleMap element defines a Map Control to display Waypoints and routs on a map.
Following attributes are available in the GoogleMap element.

|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identification of this Map|string|yes| uniqueness (contract)|
|displayRoute|Draw Route for the Waypoints|boolean|no, defaults to false||
|latitudeField|Name of the field holding the latitude value.|string|no, default "latitude"||
|longitudeField|Name of the field holding the longitude value.|string|no, default "longitude"||
|initialZoomLevel|-|int|yes||
|dataSource|Defines the data linked to the list.|string|(grey lightbulb)||
|idField|(grey lightbulb)|string|(grey lightbulb)||
|toolTipField|(grey lightbulb)|string|(grey lightbulb)||
|visibilityField|(grey lightbulb)|string|(grey lightbulb)||

### Child Nodes of GoogleMap

|Node Name|Description|
|:--------|:----------|
|Bindings|(grey lightbulb)|
|Events|(grey lightbulb)|
|GoogleMapDetails |(grey lightbulb)|

### Child nodes of Binding
|Node Name|Description|
|:--------|:----------|
|Binding|(grey lightbulb)|
|List|(grey lightbulb)|

### Bindings\ <Binding> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [DataSource\|DisplayRoute\|DisplayTraffic\|Position\|DisplayAdditionalDatasource]|(grey lightbulb)||
|binding|(grey lightbulb)|string|(grey lightbulb)||
|bindingMode|(grey lightbulb)|string [ONE_WAY]|(grey lightbulb)||

### Child node of List
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target(grey lightbulb)|string [AdditionalDatasource]|(grey lightbulb)||
|dataSource|(grey lightbulb)|string|(grey lightbulb)||

### List\<Binding> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [LatitudeField\|LongitudeField\|MapPinField\|ToolTipField\|visibilityField]|(grey lightbulb)||
|binding|(grey lightbulb)|string|(grey lightbulb)||
|type|(grey lightbulb)|string [DomDecimal\|DomText\|DomBool]|(grey lightbulb)||

### GoogleMap Events
|Name|Fired when|Required|
|:---|:---------|:-------|
|MapMarkerSelectedEvent|marker in the map selected|no|

### GoogleMapsDetails
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identifier|string|yes|(grey lightbulb)||

### Child nodes of GoogleMapDetails
|Node Name|Description|
|:--------|:----------|
|Bindings|(grey lightbulb)|
|ActionBar|(grey lightbulb)|
|CockpitSections|(grey lightbulb)|

### GoogleMapDetails Bindings\<Binding> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [Visible]|(grey lightbulb)||
|type|(grey lightbulb)|string [Boolean]|(grey lightbulb)||
|binding|(grey lightbulb)|string|(grey lightbulb)||
|bindingMode|(grey lightbulb)|string [ONE_WAY]|(grey lightbulb)||

### ActionBar

### Child nodes of ActionBar:
|Node Name|Description|
|:--------|:----------|
|ImageButton|(grey lightbulb)|

### CockpitSections 
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identifier|string|yes||


## CockpitSection
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identifier|string|yes||
|sectionPattern||string [2columns\|3columns]|yes||
|showSeparator||Boolean|(grey lightbulb)||

### CockpitSection Bindings<Binding> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [col1row1\|col2row1\|col2row2\|col2row3\|col2row4\|col3row1]|(grey lightbulb)||
|type|n.a.|(grey lightbulb)|string [Phone\|Email\|ItemIdentifier\|ItemSecondary\|ItemInfoGrey\|Image|Blob]|(grey lightbulb)||
|binding|(grey lightbulb)|string|yes|@type: Phone|
|phoneType|(grey lightbulb)|string [WORK\|MOBILE]|(grey lightbulb)|@type: Phone\|Email|
|alternateImage|(grey lightbulb)|string [.png]|(grey lightbulb)|@type: Phone\|Email|
|alternateImageFileType|(grey lightbulb)|string [.png\|.svg]|(grey lightbulb)|@type: Phone\|Email|
|horizontalAlignment|(grey lightbulb)|string [Center\|Left\|Right]|(grey lightbulb)|@type: Image|
|verticalAlignment|(grey lightbulb)|string [Center\|Bottom\|Top]|(grey lightbulb)|@type: Image\|Blob|
|fileTypeBinding|(grey lightbulb)|string [.jpg\|.png]|(grey lightbulb)|@type: Image\|Blob|
|defaultImage|(grey lightbulb)|string|(grey lightbulb)|@type: Blob|
|roundedEdge|(grey lightbulb)|Boolean|(grey lightbulb)|@type: Blob|
|defaultImageType|(grey lightbulb)|string [.png]|(grey lightbulb)|@type: Blob|

### CockpitSection Events
|Name|Fired when|Required|
|:---|:---------|:-------|
|PhoneButtonPressedEvent|phone button pressed|no|
|EmailButtonPressedEvent|email button presses|no|

### Example
```
<GoogleMap name="testMap" dataSource="ApplicationContext::User.loUsrAttachments.items[]">
  <Bindings>
    <Binding target="DataSource" binding="ApplicationContext::User.loUsrAttachments.items[]"/>
  </Bindings>
  <GoogleMapDetails name="testMapDetail">
    <Bindings>
      <Binding target="Visible" type="Boolean" binding="ProcessContext::CustomerRevenueReport_CustomerPKey"  bindingMode="TWO_WAY"/>
      <List target="AdditionalDatasource" dataSource="ProcessContext::potentialCustomers" > <!-- Optional list binding to provide an additional datasource -->
         <Binding target="LatitudeField" type="DomDecimal" binding=".latitude" /> <!-- Mandatory binding to declare the latitude field in the additional datasource -->
         <Binding target="LongitudeField" type="DomDecimal" binding=".longitude" /> <!-- Mandatory binding to declare the longitude field in the additional datasource -->
         <Binding target="MapPinField" type="DomText" binding=".mapPinId" /> <!-- Optional binding to declare the pin icon field in the additional datasource -->
         <Binding target="ToolTipField" type="DomText" binding=".toolTipText" /> <!-- Optional binding to declare the tooltip field in the additional datasource -->
         <Binding target="VisibilityField" type="DomBool" binding=".visible" /> <!-- Optional binding to declare the visibility field in the additional datasource -->
      </List>
    </Bindings>
    <ActionBar>
      <ImageButton name="testImage">
        <Bindings>
          <Binding type="Editable" target="Editable" binding="ProcessContext::CustomerRevenueReport_CustomerName" />
        </Bindings>
      </ImageButton>
      <ImageButton name=""/>
    </ActionBar>
    <CockpitSections name="testSections">
      <CockpitSection name="testSection" sectionPattern="3columns">
        <Bindings>
          <Binding target="col3row1" type="Blob" binding="ProcessContext::teamReport"/>
        </Bindings>
        <Events>
          <EmailButtonPressedEvent>
            <Params>
              <Param name="testParam" value="testValue"/>
            </Params>
          </EmailButtonPressedEvent>
          <PhoneButtonPressedEvent>
            <Params>
              <Param name="testParam" value="testValue"/>
            </Params>
          </PhoneButtonPressedEvent>
        </Events>
      </CockpitSection>
      <CockpitSection name="" />
    </CockpitSections>
  </GoogleMapDetails>
  <Events>
    <MapMarkerSelectedEvent event="testEvent" resetMultiAreas="false">
      <Params>
        <Param name="testParam" value="testValue"/>
      </Params>
    </MapMarkerSelectedEvent>
  </Events>
</GoogleMap>
```

## GroupElement Control
The GroupElement element defines a container element that can contain arbitrary UI control elements.

Following attributes are available for the GroupElement element:

|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identification of this GroupElement|Any string|yes||

### Bindings\<Resource> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [Title]|(grey lightbulb)||
|type|(grey lightbulb)|string [Label]|(grey lightbulb)||
|defaultLabel|(grey lightbulb)|string|(grey lightbulb)||
|id|(grey lightbulb)|string|(grey lightbulb)||

### Example
```
<GroupElement name="GroupElementCtrl">
  <Bindings>
    <Resource target="Title" type="Label" id="labelId" defaultLabel="defaultLabel" />
  </Bindings>
</GroupElement>
```

## AdvancedSearch Control
Following attributes are available for the AdvancedSearchControl element.
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identification of this control|string|yes||
|dataSource|Defines the data linked to the control.|Any data resource|yes||

### Events
Following events are available for AdvancedSearchControl element.

|Name|Fired when|Required|
|:---|:---------|:-------|
|AdvancedSearchStartEvent|The event is fired after the user has pressed on the "Apply" button in the AdvancedSearchControl but before the search is triggered.|No|
|AdvancedSearchEndEvent|The event is fired after the advanced search is finished|No|

### Examples
```
<AdvancedSearchControl name="AdvSearchControl" dataSource="ProcessContext::parksList.items[]">
  <Events>
    <AdvancedSearchStartEvent event="advancedSearchStarted"/> <!-- no params available -->
    <AdvancedSearchEndEvent event="advancedSearchEnded"/> <!-- no params available -->
  </Events>
</AdvancedSearchControl>
```

## GroupList Control
The GroupedList element defines list UI control that allows sorting the elements as well as grouping them. The list supports searching for one or multiple elements in the list. The GroupedList element has a single item child, which can be of any type available for list items and use any list item pattern.

Following attributes are available for the GroupedList element.

|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identification of this list|string|yes||
|searchable|Determines, whether the search bar is visible|boolean|no, defaults to true||
|groupBy|Defines the attribute all list entries must have that is used for grouping|Any attribute of the attached data|no, defaults to no grouping||
|sortBy|(grey lightbulb)|Any attribute of the attached data|no||
|dataSource|Defines the data linked to the list.|Any data resource|yes||
|master|Defies the GroupedList as Master Control in a MasterDetailSectionPage|boolean|No, defaults to false||
|direction|(grey lightbulb)|string [ASC \| DESC]|no||
|indexBar|Defines whether the list contains an index bar|boolean|No, defaults false||
|hasBorder|Defines whether the list contains a border|boolean|No, default false||
|swipe|(grey lightbulb)Obsolete|boolean|no||
|numberPadDefaultField|(grey lightbulb)|Any attribute of the attached data|||
|showPreviousNextEnter|(grey lightbulb)|boolean|||
|sortInsideGroupBy|(grey lightbulb)|Any attribute of the attached data|||
|sortDirectionInGroup|(grey lightbulb)|string [ASC \| DESC]|||
|onItemDisclosure|(grey lightbulb)|boolean|||
|searchBarPlacement|(grey lightbulb)|string[HeaderLine]|||

## IndexBar behavior
If the property indexBar is set to true, an Index Bar component is shown as an overlay on the right side of the list. It contains the symbol # for numeric entries and the letters from A to Z. Tapping on or swiping over one of the entries on the Index Bar jumps to the first group in the GroupedList, that starts with the selected letter. If no group can be found, the list will scroll to the best matching previous entry. Depending on the sort order of the groups, this can be the next one in alphabetical order or the previous one in alphabetical order. 

## ChildNodes of GroupedList
|Node Name|Description|
|:--------|:----------|
|SearchAttributes|(grey lightbulb)|
|Items|(grey lightbulb)|
|Bindings.Binding|(grey lightbulb)|
|TextBar|(grey lightbulb)|

### Search Attributes
A Grouped List may define Search Attributes if it is searchable (searchable = true).
Following attributes will be defined for each Search Attribute

|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Name of the search attribute|string|yes||

### GroupedList\<Items> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|(grey lightbulb)|string [Items]|n.a.||
|itemPattern|(grey lightbulb)|string [itemPattern]|n.a.||

### GroupedList\<Bindings>\<Binding> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [DynamicallyGroupBy \| DynamicallySortBy \| DynamicallySortInsideGroupBy]|no||
|type|(grey lightbulb)|string [Text]|no||
|binding|Sort By Dynamically |Sort Inside Group By Dynamically|(grey lightbulb)|string|no||

### GroupedList\<TextBar> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|(grey lightbulb)|string|yes||

### GroupedList\<TextBar>\<Bindings>\<Binding> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|text | backgroundColor | fontColor|no||
|type|(grey lightbulb)|Text | Color|no||
|binding|(grey lightbulb)|string|no||
|bindingMode|(grey lightbulb)|ONE_WAY|no||

### ChildNodes of GroupedList\<Items>
|Node Name|Description|
|:--------|:----------|
|ItemListLayout|(grey lightbulb) (XML Structure)|
|Bindings|(grey lightbulb)|
|ContextMenu|see passage: "ContextMenu"|

### GroupedList\<Items>\<Bindings>\<Binding> node:
(these nodes represent "GroupedList.ListAttributes")

see passage: ListAttributes

### Events
Following events are available for GroupedList elements.
|Name|Fired when|Required|
|:---|:---------|:-------|
|ItemSelectedEvent|The user has tapped a list item|No|
|ContextOpeningEvent|This event will be raised when the context menu is poped up.|No|
|ContextSelectedEvent|This event will be raised when an item from the context menu is selected.|No|
|SwipeEvent|This event will be raised when an item from the context swipe.|No|
|ListButtonPressedEvent|This event will be raised when list button pressed.|No|

### Example
```
<GroupedList name="GroupedListCtrl" searchable="true" groupBy="groupBy" sortBy="sortBy" master="true" numberPadDefaultField = "quantity" showPreviousNextEnter = "true"  dataSource="dataSource" direction="ASC" indexBar="true" hasBorder="true" onItemDisclosure="true">
  <SearchAttributes>
    <SearchAttribute name="SearchAttribute1" />            
  </SearchAttributes>
  <Items name="Items" itemPattern="itemPattern">
    <ItemListLayout>
      <xml />              
    </ItemListLayout>
    <Bindings>
      <Binding target="ListAttribute1" type="Text" binding="binding" bindingMode="ONE_WAY" /> ... <Binding target="ListAttribute1" type="Dynamic" binding="binding" bindingMode="ONE_WAY" typeField="typeField" toggleId="DomAnaDeploymentStatus" />              
    </Bindings>            
  </Items>  
</GroupedList>
```

## Multi Selection Grouped List Control
Specification like "GroupedList" Control
Additional property:

|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|GroupVisibleElementConfiguration|configuration XML|string|no|

## Multi Selection BreadCrumb Control
Specification like "MultiSelectionGroupedList" Control + Hierarchy Sub Node like for the BreadCrumb Control:

### Hierarchy
Description: (grey lightbulb) Following attributes are available for Hierarchy element.
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identifier|string|yes| (grey lightbulb)|
|labelAttribute|(grey lightbulb)|string|(grey lightbulb)| |

### ChildNodes of Hierarchy:
|Node Name|Description|
|:--------|:----------|
|Bindings|(grey lightbulb)|
|Events||

### ChildNodes of Hierarchy\<Bindings>
|Node Name|Description|
|:--------|:----------|
|Binding|(grey lightbulb)|
|Resource [if RootLabel.Type=Label]|(grey lightbulb)|

### Hierarchy\<Bindings>\<Binding> node [1-3]:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [RootLabel; ShowCategory; AddItem]|(grey lightbulb)||
|type|(grey lightbulb)|string [Text]|(grey lightbulb)||
|binding|[Binding; Show Category Binding; Add Item Binding]|(grey lightbulb)|string|(grey lightbulb)||
|bindingMode|(grey lightbulb)|string [ONE_WAY]|(grey lightbulb)||

### Hierarchy\<Bindings>\<Resource> node [0-1]: 
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [RootLabel]|(grey lightbulb)||
|type|(grey lightbulb)|string [Label]|(grey lightbulb)||
|id|(grey lightbulb)|string|(grey lightbulb)||
|defaultLabel|(grey lightbulb)|string|(grey lightbulb)||
|bindingMode|(grey lightbulb)|string [ONE_WAY]|(grey lightbulb)||

## GroupedButtonList Control
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identification of this list|string|yes||
|searchable|Determines, whether the search bar is visible|boolean|no, defaults to true||
|groupBy|Defines the attribute all list entries must have that is used for grouping|Any attribute of the attached data|no, defaults to no grouping||
|sortBy|(grey lightbulb)|Any attribute of the attached data|no||
|dataSource|Defines the data linked to the list.|Any data resource|yes||
|hasBorder|Defines whether the list contains a border|boolean|no, default false ||

### ChildNodes of GroupedButtonList
|Node Name|Description|
|:--------|:----------|
|Bindings|(grey lightbulb)|
|Footer|(grey lightbulb)|
|Items|(grey lightbulb)|
|Events|(grey lightbulb)|
|SearchAttributes|(grey lightbulb)|

### GroupedButtonList\<Bindings>\<Resource> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [Title]|(grey lightbulb)||
|type|(grey lightbulb)|string [Label]|(grey lightbulb)||
|defaultLabel|(grey lightbulb)|string|(grey lightbulb)||
|id|(grey lightbulb)|string|(grey lightbulb)||

### GroupedButtonList\<Footer>\<Items> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|(grey lightbulb)|string [FooterItems]|(grey lightbulb)||

### GroupedButtonList\<Footer>\<Items>\<Bindings>\<Resource> nodes:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [Icon; Footerlabel]|(grey lightbulb)||
|type|(grey lightbulb)|string [Image; Label]|(grey lightbulb)||
|defaultLabel|(grey lightbulb)|string|(grey lightbulb)||
|id|(grey lightbulb)|string|(grey lightbulb)||
|id|(grey lightbulb)|string|(grey lightbulb)||

### GroupedButtonList\<Items> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|(grey lightbulb)|string [Items]|(grey lightbulb)||
|itemPattern|(grey lightbulb)|string|(grey lightbulb)||

### ChildNode: GroupedButtonList\<Items>\<ItemListLayout> node:
-> includes free XML structure.

### GroupedButtonList Events
|Name|Fired when|Required|
|:---|:---------|:-------|
|ItemSelectedEvent|The user has tapped a list item|No|
|ContextOpeningEvent|This event will be raised when the context menu is poped up.|No|
|ContextSelectedEvent|This event will be raised when an item from the context menu is selected.|No|

### GroupedButtonList SearchAttributes\<SearchAttribute>
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|(grey lightbulb) |string |yes||

### Example 
```
<GroupedButtonList name="GroupedButtonListCtrl" searchable="true" groupBy="groupBy" sortBy="sortBy" dataSource="dataSource" hasBorder="true">
  <Bindings>
    <Resource target="Title" type="Label" defaultLabel="defaultLabel" id="labelId" />
  </Bindings>
  <Footer>
    <Items name="FooterItems">
      <Bindings>
        <Resource target="Icon" type="Image" id="ArrowEndBlueGrey24Inv" />
        <Resource target="FooterLabel" type="Label" id="labelId" defaultLabel="defaultLabel" />
      </Bindings>
    </Items>
  </Footer>
  <Items name="Items" itemPattern="itemPattern">
    <ItemListLayout>
      <xml />
    </ItemListLayout>
  </Items>
</GroupedButtonList>
```

## EmbeddedList Control
The EmbeddedList is similar to the GroupedList control, but with some limitations.
<ul><li>No Grouping<li>No Search<li>No Master-Detail Behaviour between List-GroupElemnt and other GroupElements<li>No Index Bar (not possible because scrolling is disabled)</ul>

## ImageButton Control
The ImageButton element defines a button that has an image as well as a text displayed to the user. A floating info text can be displayed on the button as well.
Following attributes are available for the ImageButton element.

|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identification of this image button|string|yes||
|disabled|-|boolean|no||
|foreColor|only vailable for image buttons under dashboard sections|6 digit hex value|no||
|backColor|only vailable for image buttons under dashboard sections|6 digit hex value|no||
|width|to modify the width of an imagebutton in em format|decimal|no||

### Bindings
The following data and resource bindings are available for ImageButton elements.
|Name in XML|Description|Type|Binding source|Required|
|:----------|:----------|:---|:-------------|:-------|
|Text|The text to display in the button|Label|Any label resource available in the project or an arbitrary string.|no, defaults to no label displayed|
|Image|The image to display in the button|Image|Any image resource available in the project|no, defaults to no image displayed|
|Info|The floating info to display on the button|Text|Any string|no, defaults to no floating info displayed|

### ImageButton<Bindings><Binding> / <Resource> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [Title]|(grey lightbulb)||
|type|(grey lightbulb)|string [Label]|(grey lightbulb)||
|defaultLabel|(grey lightbulb)|string|(grey lightbulb)||
|id|(grey lightbulb)|string|(grey lightbulb)||
|binding|(grey lightbulb)|string|(grey lightbulb)||
|bindingMode|(grey lightbulb)|string [ONE_WAY]|(grey lightbulb)||
|call|(grey lightbulb)|string|(grey lightbulb)||
|Parameters|(grey lightbulb)|string in xml format|(grey lightbulb)||

Paramters tag exists only when call in specified.....

### Events
The following events are available for ImageButton elements.

|Name|Fired when|Required|
|:---|:---------|:-------|
|ButtonPressedEvent|User taps button|no|

### Example
```
<ImageButton name="ImageButton" disabled="false">
  <Bindings>
    <Resource target="Image" type="Image" id="AccentureIcon24" />
    <Resource target="Text" type="Label" id="labelId" defaultLabel="defaultLabel" />
    <Binding target="Info" binding="infoBinding" bindingMode="ONE_WAY" />
    <Binding type="Visible" target="Visible" binding="bind" />
    <Binding type="Editable" target="Editable" call="dddd">
      <Parameters>
          <sample></sample>
      </Parameters>
    </Binding>

  </Bindings>
  <Events>
    <ButtonPressedEvent event="ImageButtonPressed" />
  </Events>
</ImageButton>
```

### Editability and Visibility
(availability of properties are dependent on different types)

The node types VisibilityRoles and EditabilityRoles share this property:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|allRoles|(grey lightbulb)|true/false|(grey lightbulb)||

### The Role subnodes
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|(grey lightbulb)|one or more actors from the model|(grey lightbulb)||

### Example 
```
<VisibilityRoles allRoles="false">                
  <Role name="CEO" />              
  <Role name="BpaAdmin" />
  ...
</VisibilityRoles>              
<EditabilityRoles allRoles="true" />
```

## Dropdown Control
The Dropdown control provides a dropdown menu.

Following attributes are available for the Dropdown element.
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identification of this dropdown|string|yes||
|textLines|Controls after how many lines the text in the expanded QuickFilter is truncated with ellipses. Allowed values are 1 and 2. Other values will be ignored.|integer|no| 1|
|dataSource|The filter items (including clear option)|Any list data where the list elements contain a reference to an image|yes||
|width|The width of the control and drop-down on tablets. Numeric value. Will be used as width. Can be defined in px or em.|string (e.g. "300px" or "8em")|no| "210px"|

### Binding Targets
|Target|Description|Binding Type|Required|Default|
|:-----|:----------|:-----------|:---------------|
|Label|The label displayed when no filter is selected|Label (Resource) or Text|yes||
|Headline|The Headline of the drop-down|Label (Resource) or Text|no|-|
|Icon|The icon displayed in the control (16x16 px)|Image (Resource)|no|Framework Icon (grey eye)|
|IconSelected|The icon displayed in the control while the drop-down is open (16x16 px)|Image (Resource)|no|Framework Icon (white eye)|
|Editable|Defines if the control is active (Bool or Function)|Editable|no|true|
|Visible|Defines if the control is visible (Bool or Function)|Visible|no|true|

### Dropdown \<Bindings>\<Binding> / \<Resource> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string|(grey lightbulb)| |
|type|(grey lightbulb)|string|(grey lightbulb)||
|call|(grey lightbulb)|string|(grey lightbulb)||
|defaultLabel|(grey lightbulb)|string|(grey lightbulb)|
|id|(grey lightbulb)|string|(grey lightbulb)|Label Id is required|

### Item Binding Targets
|Target|Filed of the LI contains| Binding Type | Required | Default|
|:-----|:-----------------------|:-------------|:---------|:-------|
|ItemText|Displayed item text|Label or Text|yes||
|IsSelected|Selection state|Bool|yes||
|SpecialOption|Flag to identify the Clear item. If more than one item is marked as clear option an error is logged, the first is used and the rest is ignored.|null / Text ("CLEAR")|no|null|

### Dropdown \<Items>\<Bindings>\<Binding> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)||||
|type|n.a.|(grey lightbulb)||||
|binding|Target:"itemText"|string|Yes||
|binding|Target:"IsSelected"|string|Yes||
|binding|Target:"SpecialOption"|string|No||
|bindingMode|(grey lightbulb)|string [ONE_WAY/TWO_WAY/ONE_TIME]||

### Events

The following events are available for ImageSelector elements.
|Name|Fired when|Required|
|:---|:---------|:-------|
|DropdownOpeningEvent|User taps on the Dropdown control|no|
|ItemsSelectedEvent|Fired when an item is selected or the filter is cleared|no|

### Example
```
<Dropdown name="dropdown" textLines="2" width="1" dataSource="ProcessContext::OverviewList.items[]">
  <Bindings>
    <Binding target="Editable" type="Editable" call="ProcessContext::OverviewList.current.grouping" />
    <Binding target="Visible" type="Visible" call="ProcessContext::OverviewList.current.groupSort" />
    <Resource target="Headline" type="Label" defaultLabel="TestLabel" id="TestId" />
    <Resource target="Label" type="Label" defaultLabel="TestLabel" id="TestId" />
    <Resource target="Icon" type="Image" id="ArrowEndDarkGrey24" />
    <Resource target="IconSelected" type="Image" id="ArrowEndDarkGrey24" />
  </Bindings>
  <Items>
    <Bindings>
      <Binding target="IsSelected" type="Bool" binding=".grouping" bindingMode="ONE_WAY" />
      <Binding target="ItemText" type="Label" binding=".groupSort" />
      <Binding target="SpecialOption" type="Text" binding=".reportName" bindingMode="TWO_WAY" />
    </Bindings>
  </Items>
  <Events>
    <DropdownOpeningEvent event="openingEvent" resetMultiAreas="false">
      <HideSection name="hideSection" />
    </DropdownOpeningEvent>
    <ItemsSelectedEvent event="selectedEvent" resetMultiAreas="false">
      <HideSection name="hideSection" />
    </ItemsSelectedEvent>
  </Events>
</Dropdown>
```

## ImageSelector Control
The ImageSelector element defines a list type UI control that displays images with labels. The user can select an image by tapping it.
Following attributes are available in the ImageSelector element.

|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identification of this image selector|string|yes||
|type|The type of the image selector|Tbd. / string [FilterElement] |yes||
|dataSource|The data linked to the image selector|Any list data where the list elements contain a reference to an image|yes||
|filter|Defies the ImageSelector as Master Control in a MasterDetailSectionPage|boolean|no, defaults to false||

### 
Bindings

The following data and resource bindings are available for Items inside the ImageSelector.
|Name|Description|Type|Binding source|Required|
|:---|:----------|:---|:-------------|:-------|
|Image|The attribute in the list entries that points to the image resource|Image|Any image resource available in the project|yes|
|Text|The attribute in the list entries that points to a text resource. This is shown as a label for the images|Text|Any label resource available in the project or an arbitrary string.|no, defaults to no text displayed|
|Info|The attribute in the list entries that points to an additional information resource. This will be shown as floating text over the image|Text|Any label resource available in the project or an arbitrary string.|no, defaults to no floating info displayed|

### ImageSelector\<Bindings>\<Binding> / \<Resource> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [Image; Text; Info]|(grey lightbulb)||
|type|(grey lightbulb)|string [Image; Text]|(grey lightbulb)||
|binding|(grey lightbulb)|string|(grey lightbulb)||
|bindingMode|(grey lightbulb)|string [ONE_WAY]|(grey lightbulb)||

### Events
The following events are available for ImageSelector elements.
|Name|Fired when|Required|
|:---|:---------|:-------|
|ItemSelectedEvent|User taps an image|no|

### Example
```
<ImageSelector name="ImageSelectorCtrl" type="FilterElement" dataSource="dataSource" filter="true">
  <Items>
    <Bindings>
      <Binding target="Image" type="Image" binding="imageBinding" bindingMode="ONE_WAY" />
      <Binding target="Text" type="Text" binding="textBinding" bindingMode="ONE_WAY" />
      <Binding target="Info" type="Text" binding="infoBinding" bindingMode="ONE_WAY" />
    </Bindings>
  </Items>
  <Events>
    <ItemSelectedEvent event="filterSelected">
      <Params>
        <Param name="filterCode" value="value" />
      </Params>
    </ItemSelectedEvent>
  </Events>
</ImageSelector>
```

## SelectionBox Control
The SelectionBox element defines a grouped set of elements that allow the user to select one or multiple from, similar to a radio button group or checkbox group. The selection box can have a title and is usually surrounded by a border or similar UI element to show the user that it is a logical unit.

Following attributes are available for the SelectionBox element.

|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identification of this SelectionBox|string|yes|
|disabled|-|boolean|no|

### Bindings

The following data and resource bindings are available for SelectionBox elements.
SelctionBox\<Bindings>\<Resource> / \<Binding> node:
(availability of properties depends on type)
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [Label; DataSource; Value]|(grey lightbulb)||
|type|(grey lightbulb)|string [Label]|(grey lightbulb)||
|binding|(grey lightbulb)|string|(grey lightbulb)||
|bindingMode|(grey lightbulb)|string [ONE_WAY/TWO_WAY/ONE_TIME]|(grey lightbulb)||
|toggleId|(grey lightbulb)|string (domain)|(grey lightbulb)||
|defaultLabel|(grey lightbulb)|string|(grey lightbulb)||
|labelId|(grey lightbulb)|string|(grey lightbulb)||

### The following data and resource bindings are available for SelectionBox items.
|Name|Description|Type|Binding source|Required|
|:---|:----------|:---|:-------------|:-------|
|ItemValue|The value attribute of the data. Will be passed to the selection event|Data|N/A|yes|
|ItemText|The text attribute of the data. Will be shown in the UI.|Data|N/A|yes|

### Events

The following events are available for SelectionBox elements.

If both events are defined the itemSelectedEvent will only be fired, when the user selects the already selected item.
|Name|Fired when|Required|
|:---|:---------|:-------|
|ItemSelectedEvent|User taps any item in the SelectionBox|no|
|SelectionChangedEvent|User taps an item which was not selected before|no|

### Example Source Type Binding
```
SOURCE TYPE BINDING
<SelectionBox name="SelectionBoxCtrl" disabled="false">
  <Bindings>
    <Resource target="Label" type="Label" id="labelId" defaultLabel="defaultLabel" />
    <Binding target="DataSource" binding="itemsBindingSource" bindingMode="TWO_WAY" />
    <Binding target="Value" binding="valueBinding" bindingMode="TWO_WAY" />
  </Bindings>
  <Items>
    <Bindings>
      <Binding target="ItemValue" type="Text" binding="codeBinding" bindingMode="ONE_WAY" />
      <Binding target="ItemText" type="Text" binding="textBinding" bindingMode="ONE_WAY" />
    </Bindings>
  </Items>
</SelectionBox>
```

### Example Source Type Toggle
```
SOURCE TYPE TOGGLE
<SelectionBox name="SelectionBoxCtrl" disabled="false">
  <Bindings>
    <Resource target="Label" type="Label" id="labelId" defaultLabel="defaultLabel" />
    <Binding target="DataSource" toggleId="DomAgrPurpose" bindingMode="TWO_WAY" />
    <Binding target="Value" binding="valueBinding" bindingMode="TWO_WAY" />
  </Bindings>
  <Items>
    <Bindings>
      <Binding target="ItemValue" type="Text" binding=".id" bindingMode="ONE_WAY" />
      <Binding target="ItemText" type="Text" binding=".text" bindingMode="ONE_WAY" />
    </Bindings>
  </Items>
 </SelectionBox>
```

## Stepper Control
The Stepper element defines an input control that uses a distinct range of values and provides control elements to navigate through these values. An example could be a number stepper that has a plus and a minus button that increase the value by a certain amount.
Following attributes are available in the Stepper element.

|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identification|string|yes||
|disabled|Whether this control is enabled or not|boolean|no, default false||

### Bindings

The following data and resource bindings are available for Stepper elements.
|Name|Description|Type|Binding source|Required|
|:---|:----------|:---|:-------------|:-------|
|LabelThe title to display for the stepper.|Label|Any label resource available in the project or an arbitrary string.|no, defaults to no label displayed|
|Value|The data to show in the stepper.|Any data|Any data that supports add and subtract operations|yes|
|StepSize|The amount to increase or decrease the value in the stepper|Any data|Any data that is supported by the add and subtract operations on the value data|no, defaults to 1|

### Stepper\<Bindings>\<Resource> / \<Binding> node: (availability of properties depends on type)
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [StepSize\|Value]|(grey lightbulb)||
|type|(grey lightbulb)|string [Integer\|Decimal\|SmallInteger]|(grey lightbulb)||
|binding|(grey lightbulb)|string|(grey lightbulb)||
|bindingMode|(grey lightbulb)|string [ONE_WAY/TWO_WAY/ONE_TIME]|(grey lightbulb)||
|defaultLabel|(grey lightbulb)|string|(grey lightbulb)||
|labelId|(grey lightbulb)|string|(grey lightbulb)||
|format|(grey lightbulb)|string|(grey lightbulb)||
|value|Step size (grey lightbulb)|int|(grey lightbulb)||

### Example
```
<Stepper name="StepperCtrl" disabled="false">
  <Bindings>
    <Resource target="Label" type="Label" defaultLabel="defaultLabel" id="labelId" />
    <Binding target="Value" type="Integer" binding="valueBinding" bindingMode="TWO_WAY" format=".0" />
    <Binding target="StepSize" value="2" />
  </Bindings>
</Stepper>
```

## InputArea Control
An InputArea element defines a single line text field that can accept user input. Text areas also have a label that is displayed to the user. The InputArea control can render only one line of text. For multiline text use InputAreaMultiLine UI control instead.
The following attributes are available in the InputArea element.

|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identification|string| yes||
|disabled|Whether this control is enabled or not|boolean|no||
|editable|-|boolean|no| |

### Bindings

The following data and resource bindings are available for InputArea elements.
|Name|Description|Type|Binding source|Required|
|:---|:----------|:---|:-------------|:-------|
|Label|The text to display in the text fields label.|Label|Any label resource available in the project or an arbitrary string.|no, defaults to no label displayed|
|Value|The data bound to the text vield|Data|Any data resource available in the project or an arbitrary string|No, defaults to no text initially visible in the field.|

### InputArea\<Bindings>\<Resource> / \<Binding> node: (availability of properties depends on type)
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [Label; Value]|(grey lightbulb)||
|type|(grey lightbulb)|string [Label; Text]|(grey lightbulb)||
|binding|(grey lightbulb)|string|(grey lightbulb)||
|bindingMode|(grey lightbulb)|string [ONE_WAY/TWO_WAY/ONE_TIME]|(grey lightbulb)||
|defaultLabel|(grey lightbulb)|string|(grey lightbulb)||
|labelId|(grey lightbulb)|string|(grey lightbulb)||
|format|(grey lightbulb)|string|(grey lightbulb)||

### Example
```
<InputArea name="InputArea" disabled="false" editable="true">
  <Bindings>
    <Resource target="Label" type="Label" defaultLabel="defaultLabel" id="labelId" />
    <Binding target="Value" type="TEXT" format="valueFormat" binding="valueBinding" bindingMode="ONE_WAY" />
  </Bindings>
</InputArea>
```

## InputAreaMultiLine Control
The InputAreaMultiLine UI control is a special form of the InputArea UI control. It allows us to enter more than one line of text. All properties, bindings and events of the InputArea control are also available within the InputAreaMultiLine control.

## TabSelector (implicit)
The TabSelector element defines a List of TabSelectorButtons which belongs to the Tabpages defined as Areas inside the TabbedViewAreaSection.
Following attributes are available for the TabSelector element.

|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identification of this TabSelector|"tabArea"|yes||
|disabled|-|Boolean|||
|height|-|Number|||

### Items
The TabSelector contains an <Items> Object which contains <Tab> Objects.

Following attributes are available for the Tab element.
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Name of the tab. Defines also a unique id of this element.|Any String|yes||

### Bindings

The following data and resource bindings are available for Tab elements.
|Name|Description|Type|Binding source|Required|
|:---|:----------|:---|:-------------|:-------|
|image|The image to display|Image|Any image resource available in the project.|yes|
|text|The name to display|Label|Any label resource available in the project or an arbitrary string.|yes|

### Events 
The following event is predefined for TabSelector element.
|Name|Fired when|Required|
|:---|:---------|:-------|
|ItemSelectedEvent|User taps any item in the SelectionBox|yes|

## Welcome Control
The Welcome element defines special welcome message UI control that consists of a welcome message, user name and image.
The following attributes are available for the Welcome element.

|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identification of this welcome message.|Any string|yes||

### Bindings
The following data and resource bindings are available for WelcomeMessage elements.
|Name|Description|Type|Binding source|Required|
|:---|:----------|:---|:-------------|:-------|
|Welcome|The welcome message to display|Label|Any label resource available in the project or an arbitrary string.|yes|
|User|The name to display|Text|Any string.|yes|
|ImagePath|path definition to related image|Text |Any string |no |
|companyLogo|path definition to related company image|Blob |Any string |no |
|companyLogoFileType|company logo file type. Supported are:<br>- png<br>- jpeg|Text |Any string |no |

### Welcome\<Bindings>\<Resource> / \<Binding> node: (availability of properties depends on type)
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [Welcome; User]|(grey lightbulb)||
|type|(grey lightbulb)|string [Label; Text]|(grey lightbulb)||
|binding||User Binding; ImagePath Binding (grey lightbulb)|string|(grey lightbulb)||
|bindingMode|(grey lightbulb)|string [ONE_WAY]|(grey lightbulb)||
|defaultLabel|(grey lightbulb)|string|(grey lightbulb)||
|labelId|(grey lightbulb)|string|(grey lightbulb)||

### Example
```
<Welcome name="WelcomeCtrl">
  <Bindings>
    <Resource target="Welcome" type="Label" id="welcomeLableId" defaultLabel="welcomeDefaultLabel" />
    <Binding target="User" type="Text" binding="userBinding" bindingMode="ONE_WAY" />
    <Binding target="ImagePath" type="Text" binding="ApplicationContext::User.ImagePath" bindingMode="ONE_WAY" />
    <Binding target="companyLogo" type="Blob" binding="ProcessContext::SalesOrg.mediaPath" />
    <Binding target="companyLogoFileType" type="Text" binding="ProcessContext::SalesOrg.fileType" />
  </Bindings>
</Welcome>
```

## Lookup Control
The Lookup UI element control could be used in Group elements to bind a lookup object. The lookup control does not allow to edit theediting the displayed text value. The Lookup control contains a Button control which raises an event to trigger the Lookup process.
Following attributes are available for the Lookup element.
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|disabled|Whether this control is enabled or not|boolean|no||
|name|Identification of this Lookup control.|string|Yes||

### Bindings
Lookup Control defines the following bindings.

|Name|Description|Type|Binding source|Required|
|:---|:----------|:---|:-------------|:-------|
|Label|Resource binding for the displayed label.|Label|Any label resource available in the project or an arbitrary string.|Yes|
|Value|The data bound to the text vield|\<ProcessContext>::\<BO_Attribute>|Attribute of a given business object in the process context|Yes|

### Lookup\<Bindings>\<Resource> / \<Binding> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [Label]|(grey lightbulb)||
|type|(grey lightbulb)|string [Label]|(grey lightbulb)||
|binding|(grey lightbulb)|string|(grey lightbulb)||
|bindingMode|(grey lightbulb)|string [ONE_WAY/TWO_WAY/ONE_TIME]|(grey lightbulb)||
|defaultLabel|(grey lightbulb)|string|(grey lightbulb)||
labelId|(grey lightbulb)|string|(grey lightbulb)||

### Events
Lookup Control defines the following events.
|Name|Fired when|Required|
|:---|:---------|:-------|
|LookupEvent|This event will be raised when the button of the Lookup control is pressed to trigger a lookup process.|Yes|

### Example
```
<Lookup name="LookupCtrl" disabled="false">
  <Bindings>
    <Resource target="Label" type="Label" id="labelId" defaultLabel="defaultLabel" />
    <Binding target="Value" binding="valueBinding" bindingMode="ONE_WAY" />
  </Bindings>
</Lookup>
```

## Scanner Control
The Scanner UI element control could be used in SingleAreaSections to trigger a Camera- or a Laserscan. The scanner control contains a button control which raises an event to trigger the Scan process.
Following attributes are available for the Scanner element.
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identification of this Scanner element|String|Yes||

### Scanner<Bindings><Resource> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|String|(grey lightbulb)||
|type|String / Label|(grey lightbulb)||
|id|String|(grey lightbulb)||
|defaultLabel|String|(grey lightbulb)||
|bindingMode|String / ONE_TIME|(grey lightbulb)||

### Events
Scanner control defines the following events
|Name|Fired when|Required|
|:---|:---------|:-------|
|ScanSuccessEvent|This event will be raised when a scan is successful completed|(grey lightbulb)|
|ScanFailedEvent|This event will be raised when a scan is unsuccessful completed|(grey lightbulb)|
|ButtonPressedEvent|This event will be raised when the button of the Scanner control is pressed to trigger a scan process.|(grey lightbulb)|

### Example
```
<Scanner name="BarCode">          
  <Bindings>            
    <Resource target="InstructionText" type="Label" id="ProcessContext::InstructionId" defaultLabel="ProcessContext::InstructionLabel" bindingMode="ONE_TIME" />            
    <Resource target="SuccessText" type="Label" id="ProcessContext::SuccessId" defaultLabel="ProcessContext::SuccessLabel" bindingMode="ONE_TIME" />            
    <Resource target="FailText" type="Label" id="ProcessContext::FailId" defaultLabel="ProcessContext::FailLabel" bindingMode="ONE_TIME" />          
  </Bindings>          
  <Events>            
    <ScanSuccessEvent event="ProcessContext::ScanSuccess" />            
    <ScanFailedEvent event="ProcessContext::ScanFail" />            
    <ButtonPressedEvent event="CameraClick" resetMultiAreas="false" />          
  </Events>        
</Scanner>
```

## Option Bar Control
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identification of OptionBar element|String|Yes||
|buttonHeight|specifies height of all integrated buttons|Number|(grey lightbulb)||
|buttonAlignment|specifies alignment of buttons|String [Left; Right; Center]|(grey lightbulb)||

### Child Nodes
|Node Name|Description|
|:--------|:----------|
|imageButton|0-n / refer to control type "imageButton" (grey lightbulb)|

### Example
```
<OptionBar name="optionBar" buttonAlignment="Center" buttonHeight="1">
  <ImageButton />
</OptionBar>
```

## UIContainer Control
The UIContainer element control could be used in the SingleElementArea and GroupedElementsArea.

Following attributes are available for the UIContainer element.
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identification of UIContainer element|String|Yes||

### Example
```
<Area areaName="UIContainer01GroupedElementArea" areaPattern="GroupedElementsArea">
    <UIContainerControl name="UIContainerControl01" />
    <UIContainerControl name="UIContainerControl02" />
</Area>
```

## Signature Control
The Signature element control could be used in the SingleElementArea ,GroupedElementsArea and GroupElement.

Following attributes are available for the Signature element.
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identification of Signature element|String|Yes||

### ChildNodes of SignatureControl
|Node Name|Description|
|:--------|:----------|
|Bindings| (grey lightbulb)|
|VisibilityRoles| see <Editability and Visibility>|
|EditibilityRoles| see <Editability and Visibility>|

### Hierarchy Bindings\<Resource> node[0]:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [Text]|(grey lightbulb)||
|type|(grey lightbulb)|string [Label]|(grey lightbulb)||
|defaultLabel|(grey lightbulb)|string|(grey lightbulb)||
|id|(grey lightbulb)|string|(grey lightbulb)||
|bindingMode|(grey lightbulb)|string [ONE_WAY]|(grey lightbulb)||

### Hierarchy\<Bindings>\<Binding> node [1-3](MediaPath/Edit and Access):
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [Label(MediaPath/Visible/Editable]|(grey lightbulb)||
|type|depending on the property|string [Text/Visible/Edible]|(grey lightbulb)||
|binding|[Media Path Binding; Show Category Binding(Edit and Access)]|(grey lightbulb)|string|(grey lightbulb)||
|bindingMode|(grey lightbulb)|string [ONE_WAY]|(grey lightbulb)| |
|Call|[Visibility Call; Editability call] depending on the visibility type/ editability type selected|string|(grey lightbulb)||

### Example
```
<Area areaName="DetailedSectionTab" areaPattern="GroupedElementsArea">
    <SignatureControl name="TestUISignatureControl01">
      <Bindings>
        <Resource target="text" type="Label" id="TestUISignatureControl01Id" defaultLabel="TestUISignatureControl01" bindingMode="ONE_TIME" />
        <Binding target="MediaPath" type="Text" binding="ProcessContext::CustomerDetail.loAttachment.Items[]" bindingMode="ONE_WAY" />
        <Binding type="Visible" target="Visible" call="ProcessContext::ProductDetail.checkLogisticsTabVisible">
          <Parameters />
        </Binding>
      </Bindings>
      <VisibilityRoles allRoles="true" />
      <EditabilityRoles allRoles="true" />
    </SignatureControl>
</Area>
```

## UIPlugin Control

### attributes of node \<UIPlugin>
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|uiPlugin|reference to UIPlugin contract in Model|String||

### child nodes of \<UIPlugin>
|Node Name|Description|
|:--------|:----------|
|Bindings| (grey lightbulb)|
|Events| including free designed events|

### child nodes of \<Bindings> 
|Node Name|Description|
|:--------|:----------|
|Binding| (grey lightbulb)|
|Resource||
|List||

### child nodes of \<List>
|Node Name|Description|
|:--------|:----------|
|Binding| (grey lightbulb)|

### attributes of node \<Binding>
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target||String|||
|type||[Decimal,Text, Blob]|||
|binding||String|||

### attributes of node \<Resource>
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|id||String|||
|type||[Image,Text]|||
|target| | String|||

### attributes of node \<List>
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target||String|||
|datasource||String|||

## MediaControl
A MediaControl is available in GroupElement control as a child control with one occurrence.
The following attributes are available in the MediaControl element.

|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name||String|||
|disabled||Boolean|||

### MediaControl\<Bindings>\<Binding> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [Label; Value]|(grey lightbulb)||
|type|(grey lightbulb)|string [Label; Text]|(grey lightbulb)||
|binding||Media Path Binding / Type Binding(grey lightbulb)|string|(grey lightbulb)||
|bindingMode|(grey lightbulb)|string [ONE_WAY]|(grey lightbulb)||

### Example
```
<MediaControl name="" disabled="true|false">
  <Bindings>
    <Binding target="MediaPath" type="Text" binding="" bindingMode="ONE_WAY" />
    <Binding target="Type" type="Text" binding="" bindingMode="ONE_WAY" />
  </Bindings>
</MediaControl>
```

## CardContainer
The CardContainer element defines a container element that can contain arbitrary UI control elements.
Following attributes are available for the CardContainer element:

|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name||string|yes||
|loadPriority||string|(grey lightbulb)||
|showCardContainerHeader||string|(grey lightbulb)||

### ChildNodes of CardContainer 
|Node Name|Description|
|:--------|:----------|
|Bindings|(grey lightbulb)|
|VisibilityRoles|**see [\<Editability and Visibility>**](#editability-and-visibility) |
|Events|(grey lightbulb)|
|UIPlugin|**see [\<UIPlugin> control**](#uiplugin-control) |
|ActionBar|(grey lightbulb)|
|LinkBar|(grey lightbulb)|
|CockpitList|(grey lightbulb)|
|CockpitMap|(grey lightbulb)|
|NavigationMenuContainer|**see [\<NavigationMenuContainer> control**](#navigationmenucontainer) |
|CockpitSections|**see [\<CockpitSections> control**](#cockpitsection) |

### Bindings\<Binding> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [Title]|(grey lightbulb)||
|type|(grey lightbulb)|string [Label]|(grey lightbulb)||
|defaultLabel|(grey lightbulb)|string|(grey lightbulb)||
|id|(grey lightbulb)|string|(grey lightbulb)||
|call|(grey lightbulb)|string|(grey lightbulb)||
|binding|(grey lightbulb)|string|(grey lightbulb)||
|bindingMode|(grey lightbulb)|string [ONE_WAY]|(grey lightbulb)||

### Bindings<Resource> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [Title]|(grey lightbulb)||
|type|(grey lightbulb)|string [Label]|(grey lightbulb)||
|defaultLabel|(grey lightbulb)|string|(grey lightbulb)||
|id|(grey lightbulb)|string|(grey lightbulb)||

### Events node:
|Event Name| Description|
|:---------|:-----------|
|ButtonPressedEvent|(grey lightbulb)|
|LoadContainerData|(grey lightbulb)|
|CollapsedEvent|(grey lightbulb)|

### Example
```
<CardContainer name="" showCardContainerHeader=""    loadPriority="" >
  <Bindings >
    <Binding target="Visible|Information|IsCollapsible|Information|CollapseState|IsReadyToLoad|CardStatusColor|CardState|DisplayedSubcomponentName|ShowMaximizeButton"
             type="Visible|Text|Label" binding="ProcessContext|ApplicationContext" call="ProcessContext|ApplicationContext" id="" defaultLabel="" bindingMode="ONE_WAY" >
      <Parameters depends="" >
        <Input name="" type="Literal" value="" />
      </Parameters>
    </Binding>
    <Resource target="Title" type="Label" id="" defaultLabel="" />
  </Bindings>
  <Events >
    <ButtonPressedEvent event="" resetMultiAreas="true|false" />
    <LoadContainerData event="" resetMultiAreas="true|false" />
    <CollapsedEvent event="" resetMultiAreas="true|false" />
  </Events>
  <VisibilityRoles allRoles="true|false" >
    <Role name="" depends="" />
  </VisibilityRoles>
  <UIPlugin />
  <ActionBar />
  <LinkBar />
  <CockpitList />
  <CockpitMap />
  <NavigationMenuContainer />
</CardContainer>
```

## NavigationMenuContainer
The NavigationMenuContainer element defines a container element that can contain NavigationMenuItem.
Following attributes are available for the NavigationMenuContainer element:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
name|n.a.|string|yes||

### NavigationMenuContainer\<NavigationMenuItem>
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
name|n.a.|string|yes||

### NavigationMenuItem\<Bindings>\<Resource> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [Title]|(grey lightbulb)||
|type|(grey lightbulb)|string [Label]|(grey lightbulb)||
|defaultLabel|(grey lightbulb)|string|(grey lightbulb)||
|id|(grey lightbulb)|string|(grey lightbulb)||

### NavigationMenuItem<Events> node:
|Event Name| Description|
|:---------|:-----------|
|ButtonPressedEvent|(grey lightbulb)|

### Example
```
<NavigationMenuContainer name="">
  <NavigationMenuItem name="">
    <Bindings>
      <Resource target="Image" id="AccentureIcon24" type="Image"/>
      <Resource target="Text" id="MyFavoriteLabel" type="Label" defaultLabel="Test Label"/>
    </Bindings>
    <Events>
      <ButtonPressedEvent />
    </Events>
  </NavigationMenuItem>
</NavigationMenuContainer>
```

## General Control Sub Elements
### Context menu
A context menu is a menu that offers contextual actions to the user. The type and number of actions depend on the data context, the application state and the control the menu is attached to. The following data and resource bindings are available for context menus.

|Name|Description|Type|Binding source|Required|
|:---|:----------|:---|:-------------|:-------|
|Data|The data bound to the context menu. This is used to display the menu items|Data|Any data resource, usually a list.|yes|
|Icon|The icon attribute of each data element. The icon is shown with each element|Image|Any image resource.|No, defaults to no icon shown|
|Text|The text attribute of each data element. The text is shown with each element|Label|Any label resource|No, defaults to no text shown|

### Context menus are available for the following UI controls:
<ul>
<li>Calendar
<li>Chart
<li>GroupedList
<li>List
</ul>
The following events are available for context menus.
|Name|Fired when|Required|
|:---|:---------|:-------|
|ContextItemSelectedEvent|User selects a context menu item|no|

### ChildNodes of ContextMenu
|Node Name|Description|
|:--------|:----------|
|Bindings|(grey lightbulb)|
|Items|(grey lightbulb)|

### ContextMenu \<Bindings>\<Binding> node [count 1]:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string|(grey lightbulb)||
|binding|(grey lightbulb)|string|(grey lightbulb)||
|bindingMode|(grey lightbulb)|string [ONE_WAY]|(grey lightbulb)||

### ContextMenu \<Items> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|(grey lightbulb)|string [ContextMenuItems]|(grey lightbulb)||

### ContextMenu \<Items>\<Bindings>\<Binding> node [count 0-4]:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [Icon; Text; Editable; Visible]|(grey lightbulb)||
|type|(grey lightbulb)|string [Image; Label; Editable; Visible]|(grey lightbulb)||
|binding||[Icon Binding; Text Binding; Editable Binding; Visible Binding] (grey lightbulb)|string|(grey lightbulb)||

### ListAttributes
(availability of properties are dependent on different types)
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [DataSource]|(grey lightbulb)||
|type|(grey lightbulb)|string [Text; Image Binding; Image ID; Date; Decimal; Label; Combo; Stepper; Dynamic]|(grey lightbulb)||
|binding|(grey lightbulb)|string|(grey lightbulb)||
|bindingMode|(grey lightbulb)|string [ONE_WAY; TWO_WAY; ONE_TIME]|(grey lightbulb)||
|defaultLabel|(grey lightbulb)|string|(grey lightbulb)||
|id||Label ID / Image ID (grey lightbulb)|string|(grey lightbulb)||
|format|(grey lightbulb)|number|(grey lightbulb)|Format or FormatBinding is mandatory for Dynmaic and Stepper Controls|
|toggleId||ToggleId Binding (grey lightbulb)|string|(grey lightbulb)||
|typeField|(grey lightbulb)|string|(grey lightbulb)||
|minBinding||string|no||
|maxBinding||string|no||
|stepSizeBinding||string|no||
|formatBinding||string|no|Format or FormatBinding is mandatory for Dynmaic and Stepper Controls|
|stepperEnabledBinding||string|no||
|stepperCorrelationId||string|Is available for Stepper binding|

### Editability and Visibility
(availability of properties are dependent on different types)

The node types VisibilityRoles and EditabilityRoles share this property:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|allRoles|(grey lightbulb)|true/false|(grey lightbulb)||

### The Role subnodes
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|(grey lightbulb)|one or more actors from the model|(grey lightbulb)||

### Example 
```
<VisibilityRoles allRoles="false">                
  <Role name="CEO" />              
  <Role name="BpaAdmin" />
  ...
</VisibilityRoles>              
<EditabilityRoles allRoles="true" />
```

## Event (gernal)
The name of an Event Tag is the Name of the Event triggered by the UI Element.

Following attributes are available for all Event elements.
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|Event|The Event which will be called in the process / framework|Any string (triggers event in Process) or special pattern events like "filterchangedevent" and "masterselectedevent"|yes||

## Param
The Param element defines an parameter which is passed to the called event.
Following attributes are available for Param elements
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|Name|The Name of the parameter|Any String|yes||
|Value|The Value of the parameter|Any available attribute.|yes||

## FilterParam
The FilterParam element defines a special filter description used for the ImageSelector in a FilterArea.
Following attributes are available for FilterParam elements.
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|ItemAttribute|The Attribute of the list item used to filter.|Variable (e.g. "boPointOfSale. pKey")|yes||
|FilterMethod|The Method used to compare the Attributes|"==", "\<", ">", ">=", "\<=", "!=" //Modeler should check if Method is applicable on the types of both Attributes|yes||
|FilterAttribute|The Attribute used to filter.|Variable (e.g. "pKey")|yes||

## FilterFunction
The FilterFuction element defines the use of a separately defined function to use for the filtering triggered by ImageSelector in a FilterArea. The FilterFunction should be defined in the relevant BO.
Following attributes are available for FilterFunction elements.
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|value|The function to use for the filter|Function name (e.g. "getFilter")|yes||

## SelectArea
The SelectArea element defines the Area inside a MulitArea to be selected when the Event is fired. The SelectArea element can only be used if the Control which fires the evet is defined inside a MultiArea The following attribute is available for SelectArea elements.
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name| The name of the Area inside the MultiArea| Area name| yes||

## ValidateAndSelectArea
The ValidateAndSelectArea element defines the Area inside a MulitArea to be selected when the Event is fired. The Change of the displayed Area will wait for a Validation in the Process and will not be executed if the validation fails. The ValidateAndSelectArea element can only be used if the Control which fires the evet is defined inside a MultiArea The following attribute is available for ValidateAndSelectArea elements.
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|The name of the Area inside the MultiArea|Area name|yes||

## List items
This chapter describes the use of list items, list item patterns and their effect on the UI description contracts.

## Items
The Items element defines which itempattern is used for the items of a list and which data is displayed using this pattern.
The following attributes are available for the Items element.
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|name|Identification of this Items element|Any string|yes||
|itemPattern|The itempattern used for the listitems|Name of the Itempattern(e.g. "NotesItem")|yes||

## ItemListLayout
The Items element may define an ItemListLayout that describes the presentation layout of the items.
ItemListLayout must define at least one Column element (Col). Each Column may contain at least one Row element (Row) and Each Row element may contain at least one Column (Col) element.
In a Tree-Combination of Row and Col elements in the ItemListLayout, the leaf elements (Row or Col) must define the following attributes.

|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|layoutType|Usually references a CSS class.|Any string (i.e itemTitle, itemSubTitle, image , dynamic )|no||
|bindingId|Data binding id. Usually the name of the attribute to bind data to.|Name of the binding attribute|yes||

### Bindings
The data and resource bindings available for Items elements depend on the used itempattern.

## Menus

### Application menu
Application menus are menus that are linked to a certain use case rather than a UI control. They can be attached to all pages and all sections.
Menus have menu items that execute certain actions within the application.
The following data and resource bindings are available for menu items.
|Name|Description|Type|Binding source|Required|
|:---|:----------|:---|:-------------|:-------|
|Image|The icon attribute of each data element. The icon is shown with each element|Image|Any image resource.|No, defaults to no image shown|
|Text|The text attribute of each data element. The text is shown with each element|Label|Any label resource|No, defaults to no text shown|

#### No events are defined on menu level, but the following events are available for menu items.
|Name|Fired when|Required|
|:---|:---------|:-------|
|ButtonPressedEvent|User selects a menu item|no|

### MenuItem
available properties:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|id|Identification|string|yes||
|directlyVisible|-|boolean|no||

#### MenuItem\<Bindings>\<Resource> / \<Binding> node:
|Name in XML|Description|Values / Pattern|Required| Validation/Checks|
|:----------|:----------|:---------------|:-------|:-----------------|
|target|(grey lightbulb)|string [Text; Item; Editable; Icon]|(grey lightbulb)||
|type|(grey lightbulb)|string [Image; Label; Editable; Visible]|(grey lightbulb)||
|binding|(depends on type) Binding (grey lightbulb)|string|(grey lightbulb)||
|defaultLabel|(grey lightbulb)|string|(grey lightbulb)||
|id||Label ID / Image ID (grey lightbulb)|string|(grey lightbulb)||

#### ChildNode: MenuItem<Parameters> node (element available in property grid)
-> includes free XML structure.

#### ChildNode: MenuItem<Events> node
-> includes "ButtonPressedEventOnly"

## Example
```
VISIBILITY TYPE: BINDING
<MenuItem itemId="DemoMenuItem" directlyVisible="true">
  <Bindings>
    <Resource target="Text" type="Label" id="labelId" defaultLabel="defaultLabel" />
    <Resource target="Icon" type="Image" id="ArrowEndDarkGrey24Inv" />
    <Binding type="Visible" target="Visible" binding="visibilityBinding" />
    <Binding type="Editable" target="Editable" binding="editabilityBinding" />
  </Bindings>
  <Events>
    <ButtonPressedEvent event="DemoMenuItemPressed" />
  </Events>
</MenuItem>
  
VISIBILITY TYPE: CALL
<MenuItem itemId="DemoMenuItem" directlyVisible="true">
  <Bindings>
    <Resource target="Text" type="Label" id="labelId" defaultLabel="defaultLabel" />
    <Resource target="Icon" type="Image" id="ArrowEndDarkGrey24Inv" />
    <Binding type="Visible" target="Visible" call="visibilityCall">
      <Parameters>
        <xml/>
      </Parameters>
    </Binding>
    <Binding type="Editable" target="Editable" binding="editabilityBinding" />
  </Bindings>
  <Events>
    <ButtonPressedEvent event="DemoMenuItemPressed" />
  </Events>
</MenuItem>
  
VISIBILITY TYPE: NONE
<MenuItem itemId="DemoMenuItem" directlyVisible="true">
  <Bindings>
    <Resource target="Text" type="Label" id="labelId" defaultLabel="defaultLabel" />
    <Resource target="Icon" type="Image" id="ArrowEndDarkGrey24Inv" />
    <Binding type="Editable" target="Editable" binding="editabilityBinding" />
  </Bindings>
  <Events>
    <ButtonPressedEvent event="DemoMenuItemPressed" />
  </Events>
</MenuItem>
```