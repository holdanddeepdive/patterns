# Singleton Pattern

## Singleton Pattern이란?

- 클래스의 인스턴스를 한 개만 만들고 해당 인스턴스를 전역적으로 접근하는 패턴으로, 애플리케이션에서 전역 상태를 관리하는 데 유용함
- 인스턴스를 한번만 생성함을 보장하기 위해서, 생성자를 호출할 때 인스턴스가 존재하는지 확인하고 존재하지 않는 경우에는 인스턴스를 생성하고, 존재할 때는 이미 있는 인스턴스를 반환하거나? 에러를 throw하는 방식으로 구현한다.
- `Object.freeze` 메소드를 활용하여 생성된 인스턴스가 변경되지 않도록 한다. > freezing하여 프로퍼티가 추가되거나 변경되지 않으므로 값들이 덮어써지는 리스크를 줄여준다.

```jsx
let instance;
let counter = 0;

class Counter {
	constructor() {
		if (instance) {
			throw new Error('only create one instance!');
		instance = this;
	}

	getInstance() {
		return this;
	}

	...
}

const singletonCounter = Object.freeze(new Counter());
export default singletonCounter
```

## 장단점

- 👍 인스턴스를 한번만 생성하므로 메모리 공간을 많이 절약할 수 있다.
- 👎 자바스크립트에서 싱글톤패턴은 안티패턴으로 여겨진다. Java나 C++같은 프로그래밍 언어에서는 자바스크립트처럼 바로 객체를 생성하는 것이 불가능하다. 객체지향 언어에서는 클래스를 생성하여 각 클래스는 객체를 생성하여 클래스의 인스턴스 값을 가지게 된다. 하지만 자바스크립트에서는 바로 간단하게 객체를 생성하는 것이 가능하기 때문에 위와 같이 구현하는 것은 오버스럽다. *singleton evil*
    - `Dependency Hiding` 여러 모듈에서 Singleton을 가져오고 있다고 보장할 수 없다. 이런 동작으로 인해 싱글톤 클래스 값이 수정될 수도 있다.
    - https://www.yegor256.com/2016/06/27/singletons-must-die.html
        - 데이터베이스 connection pool, repo, conf map 등 전역으로 사용하는 것을 싱글톤 패턴을 사용하지 않고 어떻게 정의할 것인가? ****************************************dependency injection****************************************
        - dependecy가 너무 많다면? 더 작은 dependecy로 쪼개는 것이 필요하다
    - https://stackoverflow.com/questions/137975/what-are-drawbacks-or-disadvantages-of-singleton-pattern
        - *You hide the dependencies of your application in your code, instead of exposing them through the interfaces. They violate the SRP. They inherently cause code to be tightly coupled. They carry state around for the lifetime of the app.*
        - 하나의 인스턴스만 가질 수 있고, 하나의 인스턴스만 관리해야 하는 리소스가 존재하는 **경우에만** singleton은 좋은 해결책이 된다.

```jsx
// 객체로 대체한다면?
let count = 0;

const counter = {
	increment() {
		return ++count;
	},
	decrement() {
		return --count;
	}
};

Object.freeze(counter);
export { counter };
```

## 테스트

- Singleton 패턴에서는 각 테스트마다 인스턴스를 생성할 수 없기 때문에 전역 인스턴스가 모든 테스트에서 사용된다. 그러므로 테스트의 순서가 중요하고, 하나의 수정사항 때문에 테스트가 실패할 수도 있다.
- 테스트가 종료되면 일어났던 모든 변경들을 초기화하여 초기 상태의 인스턴스로 돌려놓는 것이 중요하다.

## 전역적인 동작

- 전역변수는 전역 스코프에서 사용할 수 있기 때문에 항상 같은 동작을 보여주어야 한다. 전역변수를 overwrite하여 예상하지 못한 동작으로 야기될 수 있기 때문에 bad design으로 여겨진다.
- 전역 상태를 사용할 때 데이터 흐름을 이해하는 것이 까다로운 일

## React에서 상태관리

- React를 사용할 때는 일반적으로 Singleton을 사용하기 보다는 Redux, React Context 등과 같은 상태관리 도구를 사용한다.
- 전역 상태 동작은 Singleton과 비슷하지만, 우리가 사용하는 툴은 mutable한 인스턴스 대신 read-only한 상태를 제공한다. 전역 상태의 위험성이 다 사라지진 않지만, 예상치 못하게 변경되는 위험을 줄여준다.