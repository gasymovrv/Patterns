package ru.unlimit.javapro.patterns;

public class BridgeApp {

	public static void main(String[] args) {
		
		Carr c = new Sedan(new Kia());
		c.showDetails();

		Carr c2 = new Hatchback(new Kia());
		c2.showDetails();

		Carr c3 = new Sedan(new Skoda());
		c3.showDetails();

		Carr c4 = new Coupe(new Mercedes());
		c4.showDetails();
	}
}

abstract class Carr{
	Make make;
	public Carr(Make m){make=m;}
	abstract void showType();
	void showDetails(){
		showType();
		make.showMake();
		System.out.println();
	}
}
class Sedan extends Carr{
	public Sedan(Make m) {super(m);}
	void showType() {
		System.out.println("Sedan");
	}
}
class Hatchback extends Carr{
	public Hatchback(Make m) {super(m);}
	void showType() {
		System.out.println("Hatchback");
	}
}
class Coupe extends Carr{
	public Coupe(Make m) {super(m);}
	void showType() {
		System.out.println("Coupe");
	}
}


interface Make{
	void showMake();
}
class Kia implements Make{
	public void showMake() {System.out.println("Kia");}
}
class Skoda implements Make{
	public void showMake() {System.out.println("Skoda");}
}
class Mercedes implements Make{
	public void showMake() {System.out.println("Mercedes");}
}
