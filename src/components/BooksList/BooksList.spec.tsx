import { render, screen } from "@testing-library/react";
import { BooksList } from ".";

const mocksBookList = [
  {
    id: "MWkOEAAAQBAJ",
    title: "React Aprenda Praticando",
    subtitle:
      "Desenvolva aplicações web reais com uso da biblioteca React e de seus módulos auxiliares",
    authors: ["Mauricio Samy Silva"],
    publisher: "Novatec Editora",
    publishedDate: "2021-01-05",
    description:
      "React é uma biblioteca para a criação de sites, interfaces gráficas e aplicações web, criada pelo Facebook, e seu uso tem crescido muito, sendo usada por grandes empresas, como Netflix, Walmart e The New York Times. Neste livro, eminentemente prático, Maujor, com sua reconhecida didática, fornece ao leitor uma visão detalhada dos conceitos básicos e recursos da biblioteca React. Você aprenderá a desenvolver aplicativos React completos, passo a passo, desde o zero até a hospedagem em um servidor remoto. Cada capítulo apresenta um novo recurso do React, com exercícios práticos para consolidar os conceitos estudados. Destina-se a desenvolvedores com conhecimentos básicos de HTML, CSS3 e JavaScript, interessados na criação de sites tanto na área de design quanto na de desenvolvimento e programação. O livro também poderá ser útil como material de referência do React. A estrutura de pastas dos projetos desenvolvidos no livro encontra-se em https://github.com/Maujor/livro-react e o respectivo material de apoio aos projetos está disponível no site do livro em https://kwz.me/h1m.",
    categories: ["Business & Economics"],
    previewLink: "",
    imageLinks: {
      thumbnail:
        "http://books.google.com/books/content?id=MWkOEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    },
  },
  {
    id: "xEApjgEACAAJ",
    title: "React.Js Essentials",
    authors: ["Artemij Fedosejev"],
    publisher: "Packt Publishing",
    publishedDate: "2015-08-27",
    description:
      "A fast-paced guide to designing and building scalable and maintainable web apps with React.jsAbout This Book• Build maintainable and performant user interfaces for your web applications using React.js• Create reusable React.js components to save time and effort in maintaining your user interfaces• Learn how to build a ready-to-deploy React.js web application, following our step-by-step tutorialWho This Book Is ForIf you're a front-end developer with knowledge of jQuery and its libraries, along with frameworks, such as Angular.JS and Backbone.JS, or native JavaScript development, and you wish to use the fastest web user interface library there is, then this book is ideal for you.What You Will Learn• Install powerful React.js tools to make development much more efficient• Create React elements with properties and children• Get started with stateless and stateful React components• Use JSX to speed up your React.js development process• Add reactivity to your React components with lifecycle methods• Integrate your React components with other JavaScript libraries• Utilize the Flux application architecture with your React components• Test your React components with Jest test frameworkIn DetailBuilding web applications with maintainable and performant user interfaces is a challenge that many have faced for more than a decade, but no one has risen to this challenge quite like React.js. Today React.js is used by Facebook, Instagram, Khan Academy, and Imperial College London, to name a few. Many new users recognize the benefits of React.js and adopt it in their own projects, forming a fast-growing community. The speed at which React.js has evolved promises a bright future for those who invest in learning it today.React.js Essentials will take you on a fast-paced journey through building your own maintainable React.js application. Begin by exploring how you can create single and multiple user interface elements. Create stateless and stateful components and make them reactive, learn to interact between your components and lifecycle methods and gauge how to effectively integrate your user interface components with other JavaScript libraries. Delve deep into the core elements of the Flux architecture and learn how to manage your application using stores. Finish by going that extra mile with the Jest test framework, running multiple tests on your application and find solutions to scale it further without complexity.Style and approachThe book adopts a step-by-step, hands-on approach with ample codes to ensure you learn React.js at a fast pace.",
    categories: ["Computers"],
    previewLink: "",
    imageLinks: {
      thumbnail:
        "http://books.google.com/books/content?id=xEApjgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    },
  },
];

describe("BooksList component", () => {
  beforeEach(() => {
    render(<BooksList books={mocksBookList} />);
  });

  it("should render list of books", () => {
    const booksList = screen.getByTestId("books-list");
    const booksListItems = screen.getAllByTestId("books-listitem");

    expect(booksList).toBeInTheDocument();
    expect(booksListItems).toHaveLength(2);
  });
});
