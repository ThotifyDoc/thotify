---
layout: ../../../layouts/BaseLayout.astro
title: Guide zooKeeper
description: Guide pour comprendre l'utilité et le fonctionnement de zookeeper 
---
Subject: Distributed Systems
ZooKeeper is an open source project hosted by the Apache Software Foundation
Developped by Yahoo!
### Zookeeper in few words :
It enables **coordination tasks** for **distributed systems**. A coordination task is a task in‐volving  multiple  processes.  Such  a  task  can  be  for  the  purposes  of  **cooperation**  or  to regulate **contention**. 
**Cooperation** means that processes need to do something together,and processes take action to enable other processes to make progress. For example, intypical **master-worker architectures**, the worker informs the master that it is availableto do work. The master consequently assigns tasks to the worker. 
**Contention** is different:
Tt refers to situations in which two processes **cannot make progress concurrently**, so one must wait for the other. Using the same master-worker example, we really want to havea  single  master,  but  multiple  processes  may  try  to  become  the  master.  The  multipleprocesses consequently need to implement **mutual exclusion**. We can actually think of the task of acquiring mastership as the one of acquiring a lock: the process that acquires the mastership lock exercises the role of master

Zookeeper est un système distribué conçu pour centraliser la gestion des connexions entre différents serveurs et faciliter leur coordination. À l'instar d'un système de gestion multi-thread, Zookeeper décide quel nœud dans un cluster a le droit d'accéder en priorité à certaines données. Il garantit également la synchronisation des temps de réponse et coordonne les actions des différents serveurs pour assurer la cohérence et la fiabilité dans un environnement distribué. Grâce à son architecture, il permet de gérer efficacement la concurrence, les verrous distribués, et la configuration centralisée.
Zookeeper nous permet donc de faire de la coordination, du verrouillage et synchronisation entre plusieurs noeuds.


ZooKeeper uses the shared storage model to let applications implement coordinationand synchronization primitives. But shared storage itself requires network communi‐cation between the processes and the storage. It is important to stress the role of networkcommunication because it is an important source of complications in the design of a distributed system

**Message delays**:
Messages can get **arbitrarily delayed**; for instance, due to **network congestion**. **Sucharbitrary delays** may introduce **undesirable situations**. For example, process P maysend a message before another process Q sends its message, according to a reference clock, but Q’s message might be delivered first. **Processor speed**:
**Operating system scheduling** and **overload** might **induce arbitrary delays** in message processing. When one process sends a message to another, **the overall latency of this message is roughly the sum of the processing time on the sender**, the trans‐mission time, and the processing time on the receiver. If the sending or receiving process requires time to be scheduled for processing, then the message latency is higher. 
**Clockdrift**:
It is not uncommon to find systems that use some notion of time, such as when determining the time at which events occur in the system. **Processor clocks are not reliable** and can arbitrarily drift away from each other. Consequently, relying upon processor clocks might lead to incorrect decisions.

One important consequence of these issues is that it is very hard in practice to tell if aprocess has crashed or if any of these factors is introducing some arbitrary delay. Notreceiving a message from a process could mean that it has crashed, that the network isdelaying its latest message arbitrarily, that there is something delaying the process, orthat  the  process  clock  is  drifting  away.  
A  system  in  which  such  a  distinction  can’t  bemade is said to be asynchronous.Data centers are generally built using large batches of mostly uniform hardware. Buteven in data centers, we have observed the impact of all these issues on applications dueto the use of multiple generations of hardware in a single application, and subtle butsignificant performance differences even within the same batch of hardware. All thesethings complicate the life of a distributed systems designer.
ZooKeeper  has  been  designed  precisely  to  make  it  simpler  to  deal  with  these  issues.ZooKeeper does not make the problems disappear or render them completely trans‐parent  to  applications,  but  it  does  make  the  problems  more  tractable.  ZooKeeperimplements solutions to important distributed computing problems and packages upthese implementations in a way that is intuitive to developers... at least, this has beenour hope all along


Master-worker application example: 
**Master crashes** : If  the  master  is  faulty  and  becomes  unavailable,  the  system  cannot  allocate  newtasks or reallocate tasks from workers that have also failed.
**Worker crashes** : If a worker crashes, the tasks assigned to it will not be completed.

**Communication failures** : If the master and a worker cannot exchange messages, the worker might not learnof new tasks assigned to 

To deal with these problems, the system must be able to reliably elect a new master ifthe previous one is faulty, determine which workers are available, and decide when thestate of a worker is stale with respect to the rest of the system. We’ll look at each taskbriefly in the following sections.

### Glossary 

**Masterlock**: Le master lock (verrou maître) est utilisé pour contrôler l'accès exclusif à une ressource dans Zookeeper