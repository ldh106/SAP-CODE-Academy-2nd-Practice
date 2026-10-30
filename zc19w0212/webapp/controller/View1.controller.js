sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter"
], (Controller, JSONModel, Filter) => {
    "use strict";

    return Controller.extend("ncode.zc19w0212.controller.View1", {
        
        onInit() {
            let oModel = new JSONModel();
            oModel.loadData("../model/data.json");
            this.getView().setModel(oModel, "mInfo");     
            let tabEmp = this.getView().byId("tabEmp");       
            let oFilter = new Filter("sCode", "EQ", "");            
            tabEmp.getBinding("items").filter(oFilter);
        },
        onSkillSelection(oEvt){
            let oView = this.getView();
            let tabEmp = oView.byId("tabEmp");
            let oPara = oEvt.getParameter("listItem");            
            let oContext = oPara.getBindingContext("mInfo");            
            let oModel = oView.getModel("mInfo");
            let oData = oModel.getProperty("sCode", oContext);
            let oFilter = new Filter("sCode", "EQ", oData);
            tabEmp.getBinding("items").filter(oFilter);            
            let oPanel = oView.byId("panelId");
            oPanel.setExpanded(true);            
        },
        onPress(){
            let oView = this.getView()
            let tabEmp = oView.byId("tabEmp");
            let oInpStRange = oView.byId("inpStRange").getValue();
            let oInpEndRange = oView.byId("inpEndRange").getValue();
            let oFilter = new Filter("sCode", "BT", oInpStRange, oInpEndRange);
            tabEmp.getBinding("items").filter(oFilter);
            oView.byId("panelId").setExpanded(true);            
        }
    });
});