sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
], (Controller, Fragment) => {
    "use strict";

    return Controller.extend("ncode.zc19w0201.controller.View1", {
        onInit() {
        },
        // onPopup() {
        //     let oView = this.getView();
        //     let that = this;
        //     // Fragment.load().then();
        //     if(!this.getView().byId("idPopup")){
        //         Fragment.load(
        //             {
        //                 id: oView.getId(),
        //                 name: "ncode.zc19w0201.view.Popup",
        //                 type: "XML",
        //                 controller: this
        //             }
        //         ).then(
        //             function (pPopup) {
        //                 oView.addDependent(pPopup);
        //                 pPopup.open();
        //             }
        //         );
        //     }else{
        //         this.getView().byId("idPopup").open();
        //     }
        // },
        // onClose(){
        //     this.getView().byId("idPopup").close();
        // }
        onPopup(){
            if(!this.pDialog){
                this.pDialog = this.loadFragment({
                    name: "ncode.zc19w0201.view.Popup"
                });
            }
            this.pDialog.then(
                function (oPopup) {
                    oPopup.open();
            });
        },
        onClose(){
            this.getView().byId("idPopup").close();
        }
    });
});