1. `RunByPassingRunnableToThread`: Implement `Runnable` interface (and its `run()`) and assign it to `Thread`
2. `RunByNotPassingRunnableToThread`: Implement `Runnable` interface (and its `run()`) with `Thread `in it
3. `RunWithExtendedThread`: Extend `Thread` (and implement its own `run()`)
4. `RunMultiByNotPassingRunnableToThread`: Multilple threads (not just main and child)
5. `RunMultiAliveByNotPassingRunnableToThread`: `isAlive()`
6. `RunMultiJoinByNotPassingRunnableToThread`: `join()`
7. `RunMultiPriorityByNotPassingRunnableToThread`: `setPriority()`
8. `SyncSumArray`: use `synchonized` to block thread
9. `TickTockTest`: use `notify()` and `wait()` between threads acessing the same `synchronized` resource
10. `SuspendStopTest`: customized stop, suspend, resume methods