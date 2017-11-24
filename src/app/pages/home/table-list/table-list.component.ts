import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { animate,NgModule } from "@angular/core";
import { ChangeDetectorRef } from "@angular/core";
import { style } from "@angular/core";
import { transition } from "@angular/core";
import { trigger } from "@angular/core";

import { ToasterService, Toast } from 'angular2-toaster';

//import { PushNotificationComponent } from 'ng2-notifications';

declare const $: any;

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})

@NgModule({
  exports: [
    TableListComponent
  ]
})


export class TableListComponent implements OnInit {
  public orders;
  public ordenes: any;

  public keys: any;

  constructor(
    public db:AngularFireDatabase,
    private modalService:NgbModal,private toasterService: ToasterService
  ) { 
    
  }

  
  ngOnInit() {
    this.GetOrders();
  }

  VerDetalle(modal){
    //console.log(modal);
    this.modalService.open(modal);
  }

  public GetOrders(){

     this.db.list("/orders",
        query => query.orderByChild('status').equalTo('SOLICITADO')
      )
      .valueChanges()
      .subscribe(order =>{
        this.orders = order;
        console.log(this.orders);
      });

  


      

     
      
  }


  public GetOrderbyId(keyorder){
    this.ordenes = null;
    this.db.list('/orders-details/'+keyorder).valueChanges().subscribe(
    // this.db.list("/orders-details", ref => ref.orderByChild("idpedido").equalTo(keyorder)).valueChanges().subscribe(
       orderfilter =>{
        this.ordenes = orderfilter; //Array.of(orderfilter);

        //let keys = Object.keys(this.ordenes);

        console.log(this.ordenes);
      }
     )
    
    }

    public finalizarbyId(keyorder){

      this.db.database.ref('/orders/'+keyorder).update({status:'FINALIZADO'})
      alert('El pedido #' +keyorder + ' fue finalizado correctamente');
      }
    

      public finalizarbyIdRechazado(keyorder){
        this.db.database.ref('/orders/'+keyorder).update({status:'RECHAZADO'})
        alert('Se rechazó el pedido #' +keyorder + ' correctamente');
      }




      public VerNotificacion(from: any, align: any){

          const type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];
  
          const color = Math.floor((Math.random() * 6) + 1);
  
          $.notify({
              icon: 'notifications',
              message: 'Se registró un nuevo pedido'
          }, {
              type: type[color],
              timer: 3000,
              placement: {
                  from: from,
                  align: align
              }
          });
      
      }
    

      

}