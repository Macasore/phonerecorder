import L "mo:base/List";
import A "mo:base/AssocList";
import Text "mo:base/Text";


actor PhoneBook {



    public type Name = Text;
    public type Phone = Text;



    stable var book: A.AssocList<Name, Phone> = L.nil<(Name, Phone)>();


    func nameEq(l: Name, r: Name): Bool {
        return l == r;
    };

    public func insertRecord(name: Name, phone: Phone): async () {
        let (newBook, _) = A.replace<Name, Phone>(book, name, nameEq, ?phone);
        book := newBook;
    };

   public query func lookup(name: Name): async ?Phone {
        return A.find<Name, Phone>(book, name, nameEq);
    };

   public func deleteRecord(name: Name): async () {
        let newBook = L.filter<(Name, Phone)>(book, func((n, _)) { n != name });
        book := newBook;
    };

  public query func getRecords() : async A.AssocList<Name, Phone> {
    return book;
  }
};
