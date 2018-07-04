package ru.unlimit.javapro.patterns;
public class ProxyApp {

	public static void main(String[] args) {
		//с пмощью прокси реализуем ленивую загрузку изображения
		Image image = new ProxyImage("D:/images/my.jpg");
		//объект RealImage создается только когда вызывается метод display()
		image.display();
	}
}

//-------------------------------Subjects----------------------------------

//Subject
interface Image{
	//request
	void display();
}

//ConcreteSubject
class RealImage implements Image{

	String file;
	public RealImage(String file) {
		this.file = file;
		load();
	}

	void load(){
		System.out.println("Загрузка " + file);
	}
	
	@Override
	public void display() {
		System.out.println("Просмотр " + file);
	}
}

//-------------------------------Proxy----------------------------------
class ProxyImage implements Image{

	String file;
	RealImage image;
	public ProxyImage(String file) {
		this.file = file;
	}

	@Override
	public void display() {
		if(image == null){
			image = new RealImage(file);
		}
		image.display();
	}
}