// create a thread by implementing Runnable
class RunnablePriorityWithThread implements Runnable {

    //String threadName;
    Thread threadInRunnable;
    int count;
    static boolean gStop = false;
    static String gCurrentName;
    RunnablePriorityWithThread(String name) {
        threadInRunnable = new Thread(this, name);
        count = 0;
        threadInRunnable.start();
        gCurrentName = name;
    }

    // override run
    public void run() {
        System.out.println(threadInRunnable.getName() + " starting");

        // counting
        // decide whether to continue when switching threads
        do {
            count++;
            if (threadInRunnable.getName().compareTo(gCurrentName) != 0) {
                gCurrentName = threadInRunnable.getName();
                System.out.println("gCurrentName becomes " + gCurrentName);
            }
        }
        while (!gStop && count < 10000);

        gStop = true; // set true whenever a child thread has count == 10000
        System.out.println("set gStop to true");

        // finish
        System.out.println(threadInRunnable.getName() + " completed");
    }
}

public class RunMultiPriorityByNotPassingRunnableToThread {
    public static void main(String[] args) {
        System.out.println("main function started");

        // create runnable
        RunnablePriorityWithThread runnableA = new RunnablePriorityWithThread("child 0");
        RunnablePriorityWithThread runnableB = new RunnablePriorityWithThread("child 1");
        RunnablePriorityWithThread runnableC = new RunnablePriorityWithThread("child 2");
        RunnablePriorityWithThread runnableD = new RunnablePriorityWithThread("child 3");
        RunnablePriorityWithThread runnableE = new RunnablePriorityWithThread("child 4");
        RunnablePriorityWithThread runnableF = new RunnablePriorityWithThread("child 5");
        RunnablePriorityWithThread runnableG = new RunnablePriorityWithThread("child 6");
        RunnablePriorityWithThread runnableH = new RunnablePriorityWithThread("child 7");

        // set priority
        // unlike textbook, which has two threads only
        // here eight threads are created to create the scenario of
        // "CPU resource conflict", since the intel CPU today has many cores
        runnableA.threadInRunnable.setPriority(Thread.MIN_PRIORITY);
        runnableB.threadInRunnable.setPriority(Thread.MIN_PRIORITY + 1);
        runnableC.threadInRunnable.setPriority(Thread.MIN_PRIORITY + 2);
        runnableD.threadInRunnable.setPriority(Thread.MIN_PRIORITY + 3);
        runnableE.threadInRunnable.setPriority(Thread.MIN_PRIORITY + 4);
        runnableF.threadInRunnable.setPriority(Thread.MIN_PRIORITY + 5);
        runnableG.threadInRunnable.setPriority(Thread.MIN_PRIORITY + 6);
        runnableH.threadInRunnable.setPriority(Thread.MIN_PRIORITY + 7);

        try {
            runnableA.threadInRunnable.join();
            runnableB.threadInRunnable.join();
            runnableC.threadInRunnable.join();
            runnableD.threadInRunnable.join();
            runnableE.threadInRunnable.join();
            runnableF.threadInRunnable.join();
            runnableG.threadInRunnable.join();
            runnableH.threadInRunnable.join();
        }
        catch (InterruptedException e) {
            System.out.println("main thread interrupted");
        }

        // check final count
        System.out.println("runnableA count " + runnableA.count);
        System.out.println("runnableB count " + runnableB.count);
        System.out.println("runnableC count " + runnableC.count);
        System.out.println("runnableD count " + runnableD.count);
        System.out.println("runnableE count " + runnableE.count);
        System.out.println("runnableF count " + runnableF.count);
        System.out.println("runnableG count " + runnableG.count);
        System.out.println("runnableH count " + runnableH.count);

        System.out.println("main thread completed");
    }
}
