import { beforeEach, afterEach, it, expect, describe, vi } from 'vitest'
import { Bank } from './Bank'

let bank = new Bank();
//setup megfelelője
beforeEach(() =>{
  bank = new Bank();
  bank.ujSzamla("Fá Zoltán", "1928");
  bank.egyenlegFeltolt("1928", 10000);
  bank.ujSzamla("Tüdő R. Ákos", "5647");
  bank.egyenlegFeltolt("5647", 20000);
});

describe('ujSzamla', () => {
  it('létrehoz egy fiókot 0 egyenleggel ha megfelelő adatok vannak megadva', () => {
    bank.ujSzamla("Gipsz Jakab", "1234");
    expect(bank.egyenleg("1234")).toEqual(0);
  })

  it('hibát dob, ha a név null', () => {
    expect(() => {
      bank.ujSzamla(null, "4321");
    }).toThrow("null")
  });

  it('hibát dob, ha a név üres', () => {
    expect(() => {
      bank.ujSzamla("", "4321");
    }).toThrow("üres")
  });

  it('hibát dob, ha a számlaszám null', () => {
    expect(() => {
      bank.ujSzamla("Gipsz Jakab", null);
    }).toThrow("null")
  });

  it('hibát dob, ha a számlaszám üres', () => {
    expect(() => {
      bank.ujSzamla("Gipsz Jakab", "");
    }).toThrow("üres")
  });

  it('hibát dob ha a számlaszám megegyezik egy már létezővel', () => {
    bank.ujSzamla("Gipsz Jakab", "1234");
    expect(() => {
      bank.ujSzamla("Teszt Elek", "1234");
    }).toThrow("már létezik")
  });

  it('nem dob hibát ha a név megegyezik egy már létezővel', () => {
    bank.ujSzamla("Gipsz Jakab", "1234");
    expect(() => {
      bank.ujSzamla("Gipsz Jakab", "4321");
    }).not.toThrow();
  });
})

describe('egyenleg', () => {
  it('hibát dob ha a számlaszám null', () => {
    expect(() => {
      bank.egyenleg(null);
    }).toThrow("null")
  });

  it('hibát dob ha a számlaszám üres', () => {
    expect(() => {
      bank.egyenleg("");
    }).toThrow("üres")
  });

  it('hibát dob ha a számlaszám nem létezik', () => {
    expect(() => {
      bank.egyenleg("7852");
    }).toThrow("nem létezik")
  });
})

describe('egyenlegFeltolt', () => {
  it('hibát dob ha a számlaszám null', () => {
    expect(() => {
      bank.ujSzamla("Gipsz Jakab", "1234");
      bank.egyenlegFeltolt(null, 10000)
    }).toThrow("null")
  });

  it('hibát dob ha a számlaszám üres', () => {
    expect(() => {
      bank.ujSzamla("Gipsz Jakab", "1234");
      bank.egyenlegFeltolt("", 10000)
    }).toThrow("üres")
  });

  it('hibát dob ha a számlaszám nem létezik', () => {
    expect(() => {
      bank.ujSzamla("Gipsz Jakab", "1234");
      bank.egyenlegFeltolt("7657", 10000)
    }).toThrow("nem létezik")
  });

  it('hibát dob ha az összeg 0', () => {
    expect(() => {
      bank.egyenlegFeltolt("1234", 0)
    }).toThrow("pozitív")
  });

  it('hibát dob ha az összeg negatív', () => {
    expect(() => {
      bank.egyenlegFeltolt("1234", -4000)
    }).toThrow("pozitív")
  })

  it('egyenleg megváltozik', () => {
    bank.ujSzamla("Gipsz Jakab", "1234");
    bank.egyenlegFeltolt("1234", 10000);
    expect(bank.egyenleg("1234")).toBeGreaterThanOrEqual(10000);
    bank.egyenlegFeltolt("1234", 20000);
    expect(bank.egyenleg("1234")).toBeGreaterThanOrEqual(30000);
  });

  it('egyenleg megváltozik a jó számlaszámon', () => {
    bank.ujSzamla("Gipsz Jakab", "1234");
    bank.ujSzamla("Teszt Elek", "5678");
    bank.egyenlegFeltolt("1234", 10000);
    expect(bank.egyenleg("1234")).toBeGreaterThanOrEqual(10000);
    expect(bank.egyenleg("5678")).toEqual(0)
  });
});

describe("utal", () => {
  it('hibát dob ha a honnan számlaszám null', () => {
    expect(() => {
      bank.utal(null, "1928", 10000)
    }).toThrow("null");
  });

  it('hibát dob ha a honnan számlaszám nem létezik', () => {
    expect(() => {
      bank.utal("1111", "1928", 10000)
    }).toThrow("nem létezik")
  });

  it('hibát dob ha a honnan számlaszám üres', () => {
    expect(() => {
      bank.utal("", "1928", 10000)
    }).toThrow("üres")
  });

  it('hibát dob ha a hova számlaszám null', () => {
    expect(() => {
      bank.utal("1928", null, 10000)
    }).toThrow("null")
  });

  it('hibát dob ha a hova számlaszám nem létezik', () => {
    expect(() => {
      bank.utal("1928", "4444", 10000)
    }).toThrow("nem létezik")
  });

  it('hibát dob ha a hova számlaszám üres', () => {
    expect(() => {
      bank.utal("1928", "", 10000)
    }).toThrow("üres")
  });

  it('hibát dob ha az összeg 0', () => {
    expect(() => {
      bank.utal("1928", "5647", 0)
    }).toThrow("pozitív")
  });

  it('hibát dob ha az összeg negatív', () => {
    expect(() => {
      bank.utal("1928", "5647", -5000)
    }).toThrow("pozitív")
  });

  it('hibát dob ha a két számlaszám ugyanaz', () => {
    expect(() => {
      bank.utal("1928", "1928", 10000)
    }).toThrow("ugyanaz")
  });

  it('egyenlegek megváltoznak a számlákon', () => {
    expect(bank.utal("1928", "5647", 10000)).toBeTruthy();
    expect(bank.egyenleg("1928")).toEqual(0);
    expect(bank.egyenleg("5647")).toBeGreaterThanOrEqual(30000);
  });

  it('sikertelen utalásnál az egyenleg nem változik', () => {
    expect(bank.utal("1928", "5647", 10001)).toBeFalsy();
    expect(bank.egyenleg("1928")).toEqual(10000);
    expect(bank.egyenleg("5647")).toEqual(20000);
  });

  it('van-e több összeg az egyenlegen', () => {
    expect(bank.egyenleg("1928")).toBeGreaterThan(5000);
    expect(bank.utal("1928", "5647", 5000)).toBeTruthy();
    expect(bank.egyenleg("1928")).toEqual(5000);
    expect(bank.egyenleg("5647")).toEqual(25000);
  });

  it('van-e ugyanannyi', () => {
    expect(bank.egyenleg("1928")).toEqual(10000);
    expect(bank.utal("1928", "5647", 10000)).toBeTruthy();
    expect(bank.egyenleg("1928")).toEqual(0);
  });
});