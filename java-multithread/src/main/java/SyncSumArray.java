class SumArray {
    private int sum;
    synchronized int sumArray(int nums[]) {
        sum = 0;
        for (int i = 0; i < nums.length; i++) {
            sum += nums[i];
            System.out.println("Running " + Thread.currentThread().getName() + ", sum = " + sum);
            try {
                Thread.sleep(10);
            }
            catch (InterruptedException e) {
                System.out.println("Thread interrupted");
            }
        }
        return sum;
    }
}
class MyThread implements Runnable {
    Thread thrd;

    // create a static adder shared by two threads
    static SumArray adder = new SumArray();
    int a[];
    int ans;

    MyThread(String name, int nums[]) {
        thrd = new Thread(this, name);
        a = nums;
        thrd.start();
    }

    public void run() {
        System.out.println(thrd.getName() + " is calculating");
        ans = adder.sumArray(a);
        System.out.println(thrd.getName() + " completed and sum is " + ans);
    }
}
public class SyncSumArray {
    public static void main(String[] args) {
        int a[] = {1, 2, 3, 4, 5};
        MyThread t1 = new MyThread("child 1", a);
        MyThread t2 = new MyThread("child 2", a);
        try {
            t1.thrd.join();
            t2.thrd.join();
        }
        catch (InterruptedException e) {
            System.out.println("main thread interrupted");
        }
    }
}
