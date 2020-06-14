// using existing thread with runnable embedded

public class RunMultiAliveByNotPassingRunnableToThread {
    public static void main(String[] args) {
        System.out.println("main function started");

        // create runnable
        RunnableWithThread runnableA = new RunnableWithThread("child A");
        RunnableWithThread runnableB = new RunnableWithThread("child B");
        RunnableWithThread runnableC = new RunnableWithThread("child C");

        // create thread using runnable
        //Thread thread = new Thread(runnableA);

        // start the thread
        //thread.start();

        //for (int i = 0; i < 50; i++) {
        // test "alive"

        do {
            System.out.println("main thread waiting for child threads to complete");
            try {
                Thread.sleep(100);
            }
            catch(InterruptedException e) {
                System.out.println("main thread interrupted");
            }
        }
        while (runnableA.threadInRunnable.isAlive() && runnableB.threadInRunnable.isAlive() && runnableC.threadInRunnable.isAlive());

        System.out.println("main thread completed");
    }
}
