import { Component, ElementRef, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbOffcanvasConfig, NgbOffcanvas, NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IgxStepperComponent, IgxStepType, IStepChangingEventArgs } from 'igniteui-angular';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { StatutComponent } from '../../../components/statut/statut.component';
import { VcaForm } from '../../../../core/forms/vca_form';
import { EserviceService } from '../../../../core/services/eservice.service';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { FileService } from '../../../../core/utils/file-service';
import { DAMComponent } from '../eservice-create/Components/dam/dam.component';
import { VCAComponent } from '../eservice-create/Components/vca/vca.component';
import { VCNComponent } from '../eservice-create/Components/vcn/vcn.component';
import { VriComponent } from '../eservice-create/Components/vri/vri.component';

@Component({
  selector: 'app-eservice-correction',

    standalone: true,
      imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent,VCAComponent,VriComponent,VCNComponent,DAMComponent],
  templateUrl: './eservice-correction.component.html',
  styleUrls: ['./eservice-correction.component.css']
})
export class EserviceCorrectionComponent {
  myRequestForm=VcaForm

  classrooms:any[]=[];
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

@ViewChild("reqTop") reqTop!: ElementRef<HTMLElement>;
@ViewChild('stepper')stepper!:IgxStepperComponent
@ViewChild('fileInp')fileInp!:ElementRef

code:any
slug:any
prestationCode:any
req:any

  constructor(
    private router:Router,
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
    this.slug=this.activatedRoute.snapshot.paramMap.get('slug')
    this.prestationCode=this.activatedRoute.snapshot.paramMap.get('prestationCode')
    this.get()
  }


  get(){
    this.eserviceService.get(this.code,this.slug,this.prestationCode).subscribe((res:any)=>{
      this.modalService.dismissAll()
      this.req=res.data
    
    },
    (error:any)=>{
      
    })
  }


  trackByFn(index:any, item:any) {
    console.log(index,item)
    return item.isSetted; 
  }
  



  
  open(content:any, file:any) {
    //console.log(this.myRequestForm.ifu_file)
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
       current.fileArrayBuffer=arrInput
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
   this.myRequestForm.ifu_file.file=this.fileInput
    let arrInput=await FileService.readFileAsync(this.fileInput)
    this.myRequestForm.ifu_file.file64=arrInput
    this.myRequestForm.ifu_file.isSetted=true
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
    this.myRequestForm.criminal_record_file.file64=arrInput
    this.myRequestForm.criminal_record_file.isSetted=true
  }
} 

  next(){
    this.stepper.activeStepChanging.subscribe((res:any)=>{
        this.last_step=res.newIndex
      if (res.newIndex >  res.oldIndex) {
       
        switch (res.oldIndex) {

        case 0:
            this.verifyStepper1(res)
          break;
        case 1:
            this.verifyStepper2(res)
          break;
        case 2:
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

  verifyStepper1(res:any){
    console.log(this.myRequestForm)
    if(
    this.myRequestForm.structure_name=="" ||
    this.myRequestForm.structure_type=="" ||
    this.myRequestForm.department=="" ||
    this.myRequestForm.city=="" ||
    this.myRequestForm.district=="" ||
    this.myRequestForm.ifu=="" ||
    this.myRequestForm.rccm=="" ||
    this.myRequestForm.job=="" ||
    this.myRequestForm.address=="" ||
    this.myRequestForm.ifu_file.file=="" ||
    this.myRequestForm.rccm_file.file=="" 
      ){
        res.cancel=true
        this.toastrService.warning('Veuillez remplir tous les champes requis','Renseignement concernant l\'enfant')
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
        this.toastrService.warning('Veuillez remplir tous les champes requis','Renseignement concernant l\'enfant')
    }else{
      res.cancel=false
    }
   
  }
  verifyStepper3(res:any){
    if(
      this.myRequestForm.list.length==0
      ){
        res.cancel=true
        this.toastrService.warning('Veuillez charger au moins un élément','Renseignement concernant l\'enfant')
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


  public handleActiveStepChanging(event: IStepChangingEventArgs) {
    if (event.newIndex >  event.oldIndex) {

    switch (event.oldIndex) {

      case 0:
          this.verifyStepper1(event)
        break;
      case 1:
          this.verifyStepper2(event)
        break;
      case 2:
          this.verifyStepper3(event)
        break;
      case 3:
          this.verifyStepper4(event)
        break;
    
      default:
        this.stepper.navigateTo(0)
        break;
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
    this.myRequestForm.ifu_file.isSetted=false
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
         current.file64=arrInput
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
}
