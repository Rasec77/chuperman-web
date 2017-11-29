import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { animate,NgModule } from "@angular/core";
import { ChangeDetectorRef } from "@angular/core";
import { style } from "@angular/core";
import { transition } from "@angular/core";
import { trigger } from "@angular/core";


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
  private listsRef;
  public keys: any;

  constructor(
    public db:AngularFireDatabase,
    private modalService:NgbModal//,private toasterService: ToasterService
  ) { 
    this.GetOrders();
  }

  
  ngOnInit() {
   /* this.listsRef.on('child_added', function(snapshot, prevChildKey) {
      this.VerNotificacion('bottom','center');
      var status = snapshot.val();
      status['$id'] = snapshot.key();
   })*/

    
  }

  VerDetalle(modal){
    this.modalService.open(modal);
  }

  public GetOrders(){
    this.listsRef = this.db.list("/orders",
        query => query.orderByChild('status').equalTo('SOLICITADO')
      )
      
      .valueChanges()
      .subscribe(order =>{
        this.orders = order;
        this.VerNotificacion('bottom','right');
        //console.log(this.orders);
      });






  }

  



  public GetOrderbyId(keyorder){
    this.ordenes = null;
    this.db.list('/orders-details/'+keyorder).valueChanges().subscribe(
       orderfilter =>{
        this.ordenes = orderfilter; 
        //console.log(this.ordenes);
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

        //this.db.database.ref('/orders/').limitToLast(1).on("child_added",function(snap) {
         var rf= this.db.database.ref('/orders/').limitToLast(1).once("child_added",function(snap) {     
          
          const type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];
          const color = Math.floor((Math.random() * 6) + 1);
          $.notify({
              icon: 'notifications',
              message: 'Validar lista de pedidos'
          }, {
              type: type[color],
              timer: 3000,
              placement: {
                  from: from,
                  align: align
              }
          });
          
        })
        this.playAudio();
         
      }


      playAudio(){
          try
          {
            let audio = new Audio("../../../../../assets/sound/Space_Alert2.wav");
            //audio.src = ;
            audio.load();
            audio.play();
          }
          catch (e){}
        }

    

      

}