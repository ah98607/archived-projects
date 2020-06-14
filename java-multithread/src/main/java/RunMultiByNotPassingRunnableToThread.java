// using existing thread with runnable embedded

public class RunMultiByNotPassingRunnableToThread {
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

        for (int i = 0; i < 50; i++) {
            System.out.println("main thread count is " + i);
            try {
                Thread.sleep(100);
            }
            catch(InterruptedException e) {
                System.out.println("main thread interrupted");
            }
        }

        System.out.println("main thread completed");
    }
}
