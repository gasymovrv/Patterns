package examples.multithreading.pool;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class ThreadPoolTest {
    public static void main(String[] args) throws InterruptedException {
        ExecutorService executorService = Executors.newFixedThreadPool(2);

        for (int i = 0; i < 5; i++) {
            executorService.submit(new Task(i));
        }

        Thread.sleep(5000);
        //Инициирует упорядоченное завершение работы,
        // при котором ранее отправленные задачи выполняются, но новые задачи не принимаются.
        executorService.shutdown();
        System.out.println("All tasks submitted");

        //Что-то типо join, ждем наступления первого из:
        // все задачи выполнились
        // истек таймаут
        // interruption текущего потока
        executorService.awaitTermination(15, TimeUnit.SECONDS);
        System.out.println("All tasks completed");
    }
}

class Task implements Runnable {
    private int id;

    public Task(int id) {
        this.id = id;
    }

    public void run() {
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Task " + id + " was completed");
    }
}