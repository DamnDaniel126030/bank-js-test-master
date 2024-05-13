export class Bank {
  #szamlak = [];

  #szamlakereses(szamlaszam){
    if (szamlaszam == null) {
      throw new Error("A számlaszám nem lehet null")
    };
    if (szamlaszam == ""){
      throw new Error("A számlaszám nem lehet üres")
    };

    let index = 0;
    while (index < this.#szamlak.length && this.#szamlak[index].szamlaszam != szamlaszam){
      index++;
    };

    if (index == this.#szamlak.length) {
      throw new Error("A megadott számlaszámmal még nem létezik számla");
    };
    return this.#szamlak[index];
  };

  ujSzamla (nev, szamlaszam){
    if (nev == null) {
      throw new Error("A név nem lehet null")
    };
    if (nev == ""){
      throw new Error("A név nem lehet üres")
    };

    if (szamlaszam == null) {
      throw new Error("A számlaszám nem lehet null")
    };
    if (szamlaszam == ""){
      throw new Error("A számlaszám nem lehet üres")
    };
    
    let index = 0;
    while (index < this.#szamlak.length && this.#szamlak[index].szamlaszam != szamlaszam){
      index++;
    };

    if (index < this.#szamlak.length) {
      throw new Error("A megadott számlaszámmal már létezik számla");
    };

    const szamla = {
      tulajdonos: nev,
      szamlaszam: szamlaszam,
      egyenleg: 0
    };

    this.#szamlak.push(szamla)

  }

  /**
   * Lekérdezi az adott számlán lévő pénzösszeget
   * @param {string} szamlaszam   A számla számlaszáma, aminek az egyenlegét keressük
   * @throws A számlaszám nem lehet null
   * @throws A számlaszám nem lehet üres
   * @throws A számlaszámmal nem létezik számla
   * @returns {number}  A számlán lévő egyenleg
   */

  egyenleg (szamlaszam){
    return this.#szamlakereses(szamlaszam).egyenleg;
  }

  egyenlegFeltolt(szamlaszam, osszeg){
    if (osszeg <= 0){
      throw new Error("Az összeg pozitív kell legyen")
    };
    this.#szamlakereses(szamlaszam).egyenleg += osszeg;
  }

  utal(honnan, hova, osszeg){
    const szamla1 = this.#szamlakereses(honnan);
    const szamla2 = this.#szamlakereses(hova);

    if (osszeg <= 0){
      throw new Error("Az összeg pozitív kell legyen")
    };

    if (szamla1.szamlaszam == szamla2.szamlaszam) {
      throw new Error("A két számlaszám nem lehet ugyanaz")
    };

    if (szamla1.egyenleg >= osszeg) {
      szamla1.egyenleg -= osszeg;
      szamla2.egyenleg += osszeg
      return true;
    }
    else {
      return false;
    };
  }
}