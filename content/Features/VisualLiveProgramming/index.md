---
title: Visual Live-Programming
weight: 3
---

vvvv is a visual-first and fully live-programming development environment. While it is possible to develop parts of your applications by writing code in C#/.NET, this mostly a preference but hardly ever a necessity. 

{{< vimeo "478019070" 400 >}}

## One mode: Runtime

No matter if you "patch" visually or you write parts of your code in C#, any change you make is live. Compilation is happening in the background and you don't have to wait for your program restart (think: State Hot-Reload!). This allows for quick iterations and is important for creating and debugging realtime interactive applications.

{{< vimeo "478105897" 400 >}}

## VL features

VL has support for code regions like loops and conditionals, it allows you to apply patterns known from object oriented, as well as functional programming. Parts of your programs can run async or on different threads. Using programming features like generics and delegates gives you full flexibility when creating your applications. 

There is no limit in datatypes. Besides the primitive built-in types you can reference any .NET library and even create your own datatypes as needed.

<!--more-->

### Multi-Paradigm

![](image.png)

* Combines metaphors known from dataflow, functional and object-oriented programming
* Strictly evaluated
* Regions aka visual code blocks (loops, if, delegates, ...)
* Process nodes aka simple lifetime management
* Adaptive nodes aka adhoc polymorphism

### Advanced Type System 

![](image-1.png)

* Statically typed
* Automagic type inference
* First class support for mutable and immutable datatypes
* Generics aka parametric polymorphism (with bounded quantification)
* Interfaces aka subtype polymorphism
  
### Supportive IDE

![](image-2.png)

* Runtime value inspection
* Reactive/Async programming
* Easy multithreading
* Extandable with custom plugins
* Consumes any .NET assembly by providing all methods as nodes
* Compiles to C# using Roslyn