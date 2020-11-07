package examples.multithreading.racecondition;

import java.util.ArrayList;
import java.util.List;
import java.util.Queue;
import java.util.concurrent.Callable;
import java.util.concurrent.ConcurrentLinkedDeque;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class RaceConditionTest {
    public static void main(String[] args) throws InterruptedException {
        List<Callable<LazyInitRace>> tasks = new ArrayList<>();
        Queue<LazyInitRace> instances = new ConcurrentLinkedDeque<>();

        for (int i = 0; i < 100; i++) {
            tasks.add(() -> {
                LazyInitRace instance = LazyInitRace.getInstance();
                instances.add(instance);
                return instance;
            });
        }

        ExecutorService executorService = Executors.newFixedThreadPool(5);
        executorService.invokeAll(tasks);
        executorService.awaitTermination(2, TimeUnit.SECONDS);
        executorService.shutdown();

        System.out.println(LazyInitRace.instanceCount);
        System.out.println(instances);
    }
}
