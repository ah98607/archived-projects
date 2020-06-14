// using existing thread with runnable embedded

public class RunMultiJoinByNotPassingRunnableToThread {
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

        System.out.println("main thread waiting for child threads to complete");
        try {
            runnableA.threadInRunnable.join();
            System.out.println("runnableA joined");
            runnableB.threadInRunnable.join();
            System.out.println("runnableB joined");
            runnableC.threadInRunnable.join();
            System.out.println("runnableC joined");
        }
        catch(InterruptedException e) {
            System.out.println("main thread interrupted");
        }

        System.out.println("main thread completed");
    }
}
