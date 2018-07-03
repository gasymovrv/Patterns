package ru.unlimit.javapro.patterns;
public class CommandApp {
	public static void main(String[] args) {

		Comp comp = new Comp();
		User u = new User(new StartCommand(comp), new StopCommand(comp), new ResetCommand(comp));
		
		u.startComputer();
		u.stopComputer();
		u.resetComputer();
		
	}
}

//Reciver (Получатель)
class Comp{
	void start(){
		System.out.println("Start");
	}
	void stop(){
		System.out.println("Stop");
	}
	void reset(){
		System.out.println("Reset");
	}
}
//Command
abstract class Command{
	Comp computer;
	public Command(Comp computer) {this.computer = computer;}
	abstract void execute();
}
//ConcreteCommand
class StartCommand extends Command{
	public StartCommand(Comp computer) {super(computer);}
	@Override
	public void execute() {
		computer.start();
	}
}
//ConcreteCommand
class StopCommand extends Command{
	public StopCommand(Comp computer) {super(computer);}
	@Override
	public void execute() {
		computer.stop();
	}
}
//ConcreteCommand
class ResetCommand extends Command{
	public ResetCommand(Comp computer) {super(computer);}
	@Override
	public void execute() {
		computer.reset();
	}
}
//Invoker (Вызыватель)
class User{
	Command start;
	Command stop;
	Command reset;
	public User(Command start, Command stop, Command reset) {
		this.start = start;
		this.stop = stop;
		this.reset = reset;
	}
	void startComputer(){
		start.execute();
	}
	void stopComputer(){
		stop.execute();
	}
	void resetComputer(){
		reset.execute();
	}
}