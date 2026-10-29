    sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";

    return Controller.extend("ncode.zc19w0103.controller.View1", {
        onInit() {
        },
        onClick: function(){
            let oView = this.getView();
            let oInput = oView.byId("inpLastName");
            let oInput1 = oView.byId("inpFirstName");
            let oInput2 = oView.byId("inpLeader");
            let oLavel = oView.byId("Label1");
            let oCheckBox = oView.byId("chkLeader");
            let leader = "";
            oInput1.setValue("Dong Han");
            if(oInput2.getValue() == "X"){
                leader = "조장 ";
            }
            let rText = leader + oInput.getValue() + " " + oInput1.getValue();
            // alert(rText);
            // sap.m.MessageBox.show(
            //     rText, {
            //         title: "title"
            //     }
            // );
            MessageBox.show(rText, {
                title: oLavel.getText()
            });
        }
    });
});