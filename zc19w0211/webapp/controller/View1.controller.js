sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter"
], (Controller, JSONModel, Filter) => {
    "use strict";

    return Controller.extend("ncode.zc19w0211.controller.View1", {
        onInit() {
            let oModel = new JSONModel();
            oModel.loadData("../model/data.json");
            this.getView().setModel(oModel, "mInfo");
            let rModel = new JSONModel({});
            this.getView().setModel(rModel, "rInfo")
        },
        onSearch(){
            let oView = this.getView();
            let sCmbKey = oView.byId("cmbSkill").getSelectedKey();

            let oTableSkl = oView.byId("tabSkill");
            let oFilter = new Filter(
                "sLevel", "EQ", sCmbKey
            );            
            oTableSkl.getBinding("items").filter(oFilter);            
        },        
        onChange(oEvt){
            // let oView = this.getView();
            // let oCbRst = oView.byId("tabRst");
            // let oPara = oEvt.getParameter("listItem");
            // let oContext = oPara.getBindingContext("mInfo");            
            // // let sPath = oContext.getPath();
            // let oItem = oContext.getObject();             
            // let oModel = oView.getModel("mInfo");
            // oModel.setProperty("/rst", [oItem]);            
        },
        onDetail(){
            let oView = this.getView();            
            let oItem = oView.byId("tabSkill").getSelectedItem(); 
            let oContext = oItem.getBindingContext("mInfo");              
            let oSelectedObject = oContext.getObject();
            let oModel = oView.getModel("mInfo");     
            oModel.setProperty("/rst", [oSelectedObject]);                        
        }
    });
});