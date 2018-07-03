package ru.unlimit.javapro.patterns;
public class TemplateMethodApp {
	public static void main(String[] args) {
		C a = new A();
		a.templateMethod();

		System.out.println();
		
		C b = new B();
		b.templateMethod();
	}
}

abstract class C{
	final void templateMethod(){
		System.out.print("1");
		subMethod1();
		System.out.print("3");
		subMethod2();
	}
	abstract void subMethod1();
	abstract void subMethod2();
}

class A extends C{
	void subMethod1(){
		System.out.print("2");
	}
	void subMethod2() {
		System.out.print("5");
	}
}
class B extends C{
	void subMethod1(){
		System.out.print("4");
	}
	void subMethod2() {}
}