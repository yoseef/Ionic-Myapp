function Finca () {
    this.Id = 0,
    this.Nom = "",
    this.Data = new Date(),
    this.Descripcio = "",
    this.Pos = new Coor()
};
function Visita(){
  this.Id = 0,
  this.Id_Finca = 0,
  this.Data = new Date(),
  this.Observ = "",
  this.Fotos = [],
  this.position = new Coor()
};
function Coor () {
      this.lat= 0,
      this.long= 0
};
