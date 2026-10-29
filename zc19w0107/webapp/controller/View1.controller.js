sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";

    return Controller.extend("ncode.zc19w0107.controller.View1", {
        onInit() {
        },
        onMain() {
            let oViewMain = this.getView();
            let oInput = oViewMain.byId("inpMain");
            // let oInpFrag = oViewMain.byId("inpFrag");
            let oInpFrag = this.getView().byId(
                sap.ui.core.Fragment.createId( "idFrag", "inpMain" )
            );
            MessageBox.show(oInput.getValue() + oInpFrag.getValue());
        },
        onFrag: function(){
            // let oView = this.getView();
            // let sMain = oView.byId("inpMain").getValue();
            // let sFrag = oView.byId("inpFrag").getValue();
            // alert(sMain + sFrag)
        }
    });
});