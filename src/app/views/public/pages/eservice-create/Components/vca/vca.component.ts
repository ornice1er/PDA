import { Component, ElementRef, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbOffcanvasConfig, NgbOffcanvas, NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {  IgxStepperComponent, IgxStepperModule, IStepChangingEventArgs } from 'igniteui-angular';
import { ToastrService } from 'ngx-toastr';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounce } from 'ng-animate';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { VcaForm } from '../../../../../../core/forms/vca_form';
import { EserviceService } from '../../../../../../core/services/eservice.service';
import { AppSweetAlert } from '../../../../../../core/utils/app-sweet-alert';
import { LocalStorageService } from '../../../../../../core/utils/local-stoarge-service';
import { FileService } from '../../../../../../core/utils/file-service';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../../../components/loading/loading.component';
import { StatutComponent } from '../../../../../components/statut/statut.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-vca',
  templateUrl: './vca.component.html',

      standalone: true,
        imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent,IgxStepperModule, BrowserAnimationsModule,
          NgxSpinnerModule,],
  styleUrls: ['./vca.component.css'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounce,
       {
        // Set the duration to 5seconds and delay to 2seconds
        params: { timing: 2, delay: 1 }
      }))])
  ],
})
export class VCAComponent {
  myRequestForm=VcaForm

  ts:any[]=[];
  communes:any[]=[];
  departs:any[]=[];
  requiredFiles:any[]=[];
  settedFiles:any[]=[];
  imageSrc!: string | SafeResourceUrl | undefined ;
  fileInput:any
  last_step=-1;
  loading=false
  ay:any;
  oldSchoolCurrentIndex:any=0;
  elementCurrentIndex:any=0;
  system=""
  files:any=[
          {
            file:"",
            name:"Acte de naissance",
            file64:"",
            isSetted:false

        },
        {
          file:"",
          name:"Certificat d’aptitude Médical",
          file64:"",
          isSetted:false

      },
      {
        file:"",
        name:"Contrat signé des deux parties",
        file64:"",
        isSetted:false

      }
  ]

@ViewChild("reqTop") reqTop!: ElementRef<HTMLElement>;
@ViewChild('stepper')stepper!:IgxStepperComponent
@ViewChild('fileInp')fileInp!:ElementRef
bounce: any;
code:any

  constructor(
    private router:Router,
    private spinner: NgxSpinnerService,
    private eserviceService:EserviceService,
    private activatedRoute:ActivatedRoute,
    private _sanitizationService: DomSanitizer,
    configOffCanvas: NgbOffcanvasConfig,
     private offcanvasService: NgbOffcanvas,
     private toastrService: ToastrService,
     private lsService:LocalStorageService,
     config: NgbModalConfig,
    private modalService: NgbModal) {
      config.backdrop = 'static';
      config.keyboard = false;
      
    configOffCanvas.position = 'end';
		configOffCanvas.backdropClass = 'bg-dark';
		configOffCanvas.keyboard = false;
   }
  ngOnChanges(changes: SimpleChanges): void {
   console.log(changes)
  }
  ngOnDestroy(): void {
  
  }

  ngOnInit(): void {

    this.code=this.activatedRoute.snapshot.paramMap.get('code')
    this.getDepartments()
    this.getTypeStructures()
  }

  getDepartments(){
    this.eserviceService.getAllDepart().subscribe((res:any)=>{
      this.departs=res
    })
  }

  getTypeStructures(){
    this.eserviceService.getTypeStructures().subscribe((res:any)=>{
      this.ts=res.data
    })
  }


  getCommunes(event:any){
    this.eserviceService.getAllCommune(event.target.value).subscribe((res:any)=>{
      this.communes=res
    })
  }


  store(myForm:any){
    let files:any[]=[]
    let formData= new FormData()

    if (this.myRequestForm.criminal_record_file.file64!= "") {
      files.push({
        name:this.myRequestForm.criminal_record_file.name,
        file64:this.myRequestForm.criminal_record_file.file64
      })
    }

    if (this.myRequestForm.doc_file.file64!= "") {
      files.push({
        name:this.myRequestForm.doc_file.name,
        file64:this.myRequestForm.doc_file.file64
      })
    }

    formData.append('myFiles',JSON.stringify(files))
    formData.append('infos',JSON.stringify(this.myRequestForm))
    formData.append('from_pns',"0")
    formData.append('code',this.code)

    
    this.loading=true
      this.eserviceService.store(formData).subscribe((res:any)=>{
        this.loading=false

        this.toastrService.success(res.message)
        this.reqTop.nativeElement.scrollTop
        this.reInit()
        myForm.resetForm()
        this.stepper.navigateTo(0)
      })
  }


  trackByFn(index:any, item:any) {
    console.log(index,item)
    return item.isSetted; 
  }
  



  
  open(content:any, file:any) {
    //console.log(this.myRequestForm.doc_file)
    this.readURL(file)
		this.offcanvasService.open(content);
	}
  readURL(file: File): void {
    // this.imageSrc=this._sanitizationService.bypassSecurityTrustResourceUrl(file)
    console.log(file)
    const reader = new FileReader();
    reader.onload = e =>{
     let src = reader.result as string
      this.imageSrc=this._sanitizationService.bypassSecurityTrustResourceUrl(src)

    };
    reader.readAsDataURL(file);

}

removeFile(i:any){
  //this.fileInputs.splice(i,1)
  AppSweetAlert.confirmBox("error","Document joint","Voulez vous retier cette pièce ?").then((result:any)=>{
    if (result.isConfirmed) {
      this.requiredFiles[i].file="",
      this.requiredFiles[i].isSetted=false
    }
  })
 
}

  async upload(event:any, index:any){
  if(event.target.files.length>0){
   this.fileInput=event.target.files[0]
    let arrInput=await FileService.readFileAsync(this.fileInput)
    let current =this.requiredFiles[index];
       current.fileArrayBuffer=await FileService.fromArrayBufferToBase64(arrInput)
       current.file=this.fileInput
       current.isSetted=true
       current.hasFilename=false
      this.requiredFiles.slice(index,current)
      console.log(this.requiredFiles)
  }
} 
  async uploadIfu(event:any){
  if(event.target.files.length>0){
   this.fileInput=event.target.files[0]
   this.myRequestForm.doc_file.file=this.fileInput
    let arrInput=await FileService.readFileAsync(this.fileInput)
    this.myRequestForm.doc_file.file64=await FileService.fromArrayBufferToBase64(arrInput)
    this.myRequestForm.doc_file.isSetted=true
  }
} 
  async uploadRccm(event:any){
  if(event.target.files.length>0){
   this.fileInput=event.target.files[0]
   this.myRequestForm.rccm_file.file=this.fileInput
    let arrInput=await FileService.readFileAsync(this.fileInput)
    this.myRequestForm.rccm_file.file64=arrInput
    this.myRequestForm.rccm_file.isSetted=true
  }
} 
  async uploadCR(event:any){
  if(event.target.files.length>0){
   this.fileInput=event.target.files[0]
   this.myRequestForm.criminal_record_file.file=this.fileInput
    let arrInput=await FileService.readFileAsync(this.fileInput)
    this.myRequestForm.criminal_record_file.file64=await FileService.fromArrayBufferToBase64(arrInput)
    this.myRequestForm.criminal_record_file.isSetted=true
  }
} 

  next(){
    this.stepper.activeStepChanging.subscribe((res:any)=>{
        this.last_step=res.newIndex
      if (res.newIndex >  res.oldIndex) {
       
        switch (res.oldIndex) {

        case 0:
            this.verifyStepper7(res)
          break;
        case 1:
            this.verifyStepper6(res)
          break;
        case 2:
            this.verifyStepper1(res)
          break;
        case 3:
            this.verifyStepper2(res)
          break;
        case 4:
            this.verifyStepper3(res)
          break;
      
        default:
          this.stepper.navigateTo(0)
          break;
      }
    } 
    })
    this.stepper.next()
    this.reqTop.nativeElement.scrollIntoView()
    console.log(this.myRequestForm)
  }

  prev(){

    this.stepper.prev()
  }


  getEntrepriseDetails(){
    this.spinner.show();
    this.eserviceService.getEntrepriseDetails(this.myRequestForm.code).subscribe((res:any)=>{
      if (res.success) {
        let el=JSON.parse(res.data.details)
        this.myRequestForm.type=el.type
        this.myRequestForm.code=el.code
        this.myRequestForm.has_account=el.has_account
        this.myRequestForm.email_requester=el.email_requester
        this.myRequestForm.identity_requester=el.identity_requester
        this.myRequestForm.contact_requester=el.contact_requester
        this.myRequestForm.quality_requester=el.quality_requester
        this.myRequestForm.structure_name=el.structure_name
        this.myRequestForm.structure_type=el.structure_type
        this.myRequestForm.department=el.department
        this.myRequestForm.city=el.city
        this.myRequestForm.district=el.district
        this.myRequestForm.ifu=el.ifu
        this.myRequestForm.rccm=el.rccm
        this.myRequestForm.job=el.job
        this.myRequestForm.address=el.address
        this.myRequestForm.ifu_file=el.ifu_file
        this.myRequestForm.rccm_file=el.rccm_file
        this.myRequestForm.identity_responsable=el.identity_responsable
        this.myRequestForm.criminal_record=el.criminal_record
        this.myRequestForm.criminal_record_file=el.criminal_record_file

  
        this.eserviceService.getAllCommune(el.department).subscribe((res:any)=>{
          this.communes=res
        })
        
  
        console.log(res.data)
        this.stepper.navigateTo(2)
  
      } else {
  
        this.toastrService.warning('Aucune donnée trouvée avec ce code','Identification promoteur')
  
      }
  
      this.spinner.hide();
    },(err:any)=>{
      this.spinner.hide();
  
      this.toastrService.warning(err.error,'Identification promoteur')
  
    })
  
  }

  verifyStepper1(res:any){
    console.log(this.myRequestForm)
    if(
    this.myRequestForm.structure_name=="" ||
    this.myRequestForm.structure_type=="" ||
    this.myRequestForm.department=="" ||
    this.myRequestForm.city=="" ||
    this.myRequestForm.district=="" ||
    this.myRequestForm.job=="" ||
    this.myRequestForm.address=="" ||
    this.myRequestForm.doc_file.file==""
      ){
        res.cancel=true
        this.toastrService.warning('Veuillez remplir tous les champes requis','Informations sur la structure')
    }else{
      res.cancel=false
    }
}
  verifyStepper2(res:any){
    if(
      this.myRequestForm.identity_responsable=="" ||
      this.myRequestForm.criminal_record=="" ||
      this.myRequestForm.criminal_record_file.file=="" 
      ){
        res.cancel=true
        this.toastrService.warning('Veuillez remplir tous les champes requis','Informations sur le responsable de structure')
    }else{
      res.cancel=false
    }
   
  }
  verifyStepper3(res:any){
    if(
      this.myRequestForm.list.length==0
      ){
        res.cancel=true
        this.toastrService.warning('Veuillez charger au moins un élément','Informations sur le ou le(s) contrat(s) à soumettre ')
    }else{
      res.cancel=false
    }
  }
  verifyStepper4(res:any){
    //   if(
  
    //   ){

    //     res.cancel=true
    //     this.toastrService.warning('Veuillez remplir tous les champes requis','Renseignement concernant l\'enfant')
    // }else{
    //   if (!this.isValidEmail(this.myRequestForm.student.parent.father_email) || !this.isValidEmail(this.myRequestForm.student.parent.mother_email)) {
    //     res.cancel=true
    //     this.toastrService.warning('Veuillez insérer un email valide','Email validation')
  
    //   }else{
    //     res.cancel=false
  
    //   }
    //}
  

  }
  verifyStepper5(res:any){
  //   if(true){

  //     res.cancel=true
  //     this.toastrService.warning('Veuillez remplir tous les champes requis','Renseignement concernant l\'enfant')
  // }else{
  //   if (!this.isValidEmail(this.myRequestForm.student.parent.tutor_email)) {
  //     res.cancel=true
  //     this.toastrService.warning('Veuillez insérer un email valide','Email validation')

  //   }else{
  //     res.cancel=false

  //   }
  // }


}
verifyStepper7(res:any){
  if (this.myRequestForm.has_account=="1") {
    if(this.myRequestForm.code==""){
        res.cancel=true
        this.toastrService.warning('Veuillez insérer un code ','Type de demandeur')
       }else{
        res.cancel=false
  
      }
  } else {
    if( this.myRequestForm.type==""){
        res.cancel=true
        this.toastrService.warning('Veuillez choisir un type','Type de demandeur')
       }else{
        res.cancel=false
  
      }
  }

}

  public handleActiveStepChanging(event: IStepChangingEventArgs) {
    if (event.newIndex >  event.oldIndex) {

    switch (event.oldIndex) {

      case 0:
          this.verifyStepper7(event)
        break;
      case 1:
          this.verifyStepper6(event)
        break;
      case 2:
          this.verifyStepper1(event)
        break;
      case 3:
          this.verifyStepper2(event)
        break;
      case 4:
          this.verifyStepper3(event)
        break;
    
      default:
        this.stepper.navigateTo(0)
        break;
    }
  }
   }

   verifyStepper6(res:any){
    if(
    this.myRequestForm.identity_requester=="" ||
    this.myRequestForm.phone_requester=="" ||
    this.myRequestForm.email_requester=="" ||
    this.myRequestForm.quality_requester==""
      ){
        res.cancel=true
        this.toastrService.warning('Veuillez remplir tous les champes requis','Informations sur le soumissionnaire')
    }else{
      if (!this.isValidEmail(this.myRequestForm.email_requester)) {
            res.cancel=true
            this.toastrService.warning('Veuillez insérer un email valide','Email validation')
      
          }else{
            res.cancel=false
      
          }
    }
  }
 


  filterByType(type:any){
    return this.requiredFiles.filter((el:any) => el.type==type && el.isRequired == true)
  }

  verifiedFiles(type:any){
    let files= this.filterByType(type)
    let notSetted= files.filter((el:any)=>el.isSetted==false);

    return notSetted.length >0 ? false:true
  }

  checkControl(){
    //this.dropdownList=this.dropdownList2
  }


  public isValidEmail(emailString: string): boolean {
    try {
      let pattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
      let valid = pattern.test(emailString);
      return valid;
    } catch (TypeError) {
      return false;
    }
  }

  openOldSchoolEdition(content:any,i:any){
    this.oldSchoolCurrentIndex=i
    this.modalService.open(content)
  }
  removeItem(i:any){
    this.myRequestForm.old_schools.splice(i,1)
  }

  addElement(form:NgForm){
   

    this.myRequestForm.list.push({
      beneficiary:form.value.beneficiary,
      old:form.value.old,
      job:form.value.job,
      files:this.files
    })
    this.modalService.dismissAll()
    this.reInitFiles()
    form.resetForm()

  }
  editElement(){
    this.modalService.dismissAll()
  }
 

  openEdition(content:any,i:any){
    this.elementCurrentIndex=i
    this.modalService.open(content)
  }
  removeItem2(i:any){
    this.myRequestForm.list.splice(i,1)
  }



  add(content:any){
    this.modalService.open(content,{size:'lg'});
  }

  convertTobase64(){
    this.settedFiles.forEach(async (el:any) => {
      el.fileArrayBuffer=await FileService.fromArrayBufferToBase64(await FileService.readFileAsync(el.file)) 
    })
  }

  changeIfu(){
    this.myRequestForm.doc_file.isSetted=false
  }

  changeRccm(){
    this.myRequestForm.rccm_file.isSetted=false
  }

  changeCR(){
    this.myRequestForm.criminal_record_file.isSetted=false
  }

  async uploadAtachementFile(event:any, index:any){
    if(event.target.files.length>0){
      this.fileInput=event.target.files[0]
      let arrInput=await FileService.readFileAsync(this.fileInput)
      let current =this.files[index];
         current.file64=await FileService.fromArrayBufferToBase64(arrInput)
         current.file=this.fileInput
         current.isSetted=true
        this.files.slice(index,current)
     }
  }
  async uploadChangedAtachementFile(event:any, index:any){
    if(event.target.files.length>0){
      this.fileInput=event.target.files[0]
      let arrInput=await FileService.readFileAsync(this.fileInput)
      let current =this.myRequestForm.list[this.elementCurrentIndex].files[index];
         current.file64=arrInput
         current.file=this.fileInput
         current.isSetted=true
         this.myRequestForm.list[this.elementCurrentIndex].files.slice(index,current)
     }
  }

  reInitFiles(){
    this.files=[
      {
        file:"",
        name:"Acte de naissance",
        file64:"",
        isSetted:false

    },
    {
      file:"",
      name:"Certificat d'aptitude médiale",
      file64:"",
      isSetted:false

  },
  {
    file:"",
    name:"Contrat signé des deux parties",
    file64:"",
    isSetted:false

  }
    ]
  }


  reInit(){
    this.myRequestForm={
      code:"",
      has_account:"",
      type:"",
      identity_requester:"",
      email_requester:"",
      contact_requester:"",
      quality_requester:"",
      structure_name:"",
      structure_type:"",
      department:"",
      city:"",
      district:"",
      ifu:"",
      rccm:"",
      job:"",
      address:"",
      ifu_file:{
          file:"",
          name:"IFU",
          file64:"",
          isSetted:false
  
      },
      rccm_file:{
          file:"",
          name:"RCCM",
          file64:"",
          isSetted:false
  
      },
      identity_responsable:"",
      criminal_record:"",
      criminal_record_file:{
          file:"",
          name:"Casier judiciaire",
          file64:"",
          isSetted:false
  
      },
      doc_file:{
          file:"",
          name:"Pièce d'identification (IFU,RCCM,CNI,CIP,...)",
          file64:"",
          isSetted:false
  
      },
      list:[]
  }
  }
}
