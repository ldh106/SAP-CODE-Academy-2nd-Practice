sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";

    return Controller.extend("ncode.zc19w0105.controller.View1", {
        onInit() {
        },
        onSearch: function() {
            let oView = this.getView();
            let oInpSN = oView.byId("inpSN");
            let oInpSC = oView.byId("inpSC");
            let oInpMC = oView.byId("inpMC");
            if(oInpSN.getValue() == "N0001"){
                oInpSC.setValue("PRO");
                oInpMC.setValue("HP");
            }else{
                oInpSC.setValue("");
                oInpMC.setValue("");
                MessageBox.show("잘못된 제품코드입니다.", {
                    title: "CodeError"
                });
            }
            
        }
    });
});