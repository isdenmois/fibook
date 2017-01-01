import BookParser from './BookParser';

const firstName = 'Тестовый';
const lastName = 'Автор';
const bookTitle = 'Тестовое название';
const bookImage = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABVlBMVEXMXRXZcinheDHjeTHkezLlfTLmfzPngTPogzTphTXqhzXriTXsijbpiDbpfjnldC7neC/qfTHsgTLuhTPwiTTyjTX0kTb2lDf3lzj5mjn6nDn5nUHqiUn0vZj1wJjyo2b7nTr4mTnohTXvnWT////++PL5yJv2m0T1kjfukUz3w5n607P98eb/+fP7uXfxizXogjT4r2n+7Nr8woTuhTT0pmf84836w4/4nkT92rX4tHXrfzLlfDL1qWj7r1782bXvjUHoeTHjeTL3oVD6voP+8ub6rF71v5nmdC/idjH6okb+8ebyk0L0rHP+9/Ljbi7hdDD938H+5s75n0X0soDoiVXgai3fcTD6s2r95c34v47517/31L7uq4neZSzeby/7qVL6zqfzpGf75tjxt5fuspXcYSvdbi/5pVL3rWnummTslmPkfEfmi2DgdUXaXirecDDicDaUheWYAAAAAnRSTlMQj0FWQdgAAAC/SURBVHgBTciDUoZhEIbhvT89b7Zt28aow/uPqkF2DbLtGmVe68X47/4VkvjvEC8pCXjgUwQBCLM0uIEI7RAk5QLPFsd5hARhEkABt5ZyKYWLHpSnlZXpKMtu8hSq25Q5VFlZ2TRcOlJZNTowNh7ARhNsWfWuexYiAFZoyzoLK1n7efSxU5q40XpUv9oGAYxOW9dc+5aiZHPggYszJ/dVzpGUFE0wGaqF/SI+5UdSqEiSc3FezHs9ZIdFvsVe3wB60yjok/4PWAAAAABJRU5ErkJggg==';
const contentType = 'image/png';

describe('BookParser', () => {
    const bookData = `<?xml version="1.0" encoding="UTF-8"?>
    <FictionBook xmlns="http://www.gribuser.ru/xml/fictionbook/2.0" xmlns:l="http://www.w3.org/1999/xlink">
    <description>
      <title-info>
        <author>
          <first-name>${firstName}</first-name>
          <last-name>${lastName}</last-name>
        </author>
        <book-title>${bookTitle}</book-title>
        <coverpage>
          <image l:href="#cover.jpg"/>
        </coverpage>
      </title-info>
    </description>
    <binary id="cover.jpg" content-type="${contentType}">${bookImage}</binary>
    <binary id="test.jpg" content-type="${contentType}">123</binary>
    </FictionBook>`;
    const parser = new BookParser(bookData);

    it('should parse author', () => {
        expect(parser.author).toEqual(`${firstName} ${lastName}`);
    });

    it('should parse title', () => {
        expect(parser.title).toEqual(bookTitle);
    });

    it('should parse book image', () => {
        expect(parser.image).toEqual({
            data: bookImage,
            fileName: 'testovyy_avtor_testovoe_nazvanie.jpg',
            type: contentType,
        });
    });

    it('should parse empty book when coverpage is not exist', () => {
        const badBookData = `<?xml version="1.0" encoding="UTF-8"?>
        <FictionBook xmlns="http://www.gribuser.ru/xml/fictionbook/2.0" xmlns:l="http://www.w3.org/1999/xlink">
        <description>
          <title-info>
            <author>
              <first-name>${firstName}</first-name>
              <last-name>${lastName}</last-name>
            </author>
            <book-title>${bookTitle}</book-title>
          </title-info>
        </description>
        </FictionBook>
        `;
        const badParser = new BookParser(badBookData);
        expect(badParser.image).toBeFalsy();
    });

    it('should parse empty book when coverpage is bad', () => {
        const badBookData = `<?xml version="1.0" encoding="UTF-8"?>
        <FictionBook xmlns="http://www.gribuser.ru/xml/fictionbook/2.0" xmlns:l="http://www.w3.org/1999/xlink">
        <description>
          <title-info>
            <author>
              <first-name>${firstName}</first-name>
              <last-name>${lastName}</last-name>
            </author>
            <book-title>${bookTitle}</book-title>
            <coverpage>
              <image l:href="#cover.jpg"/>
            </coverpage>
          </title-info>
        </description>
        </FictionBook>
        `;
        const badParser = new BookParser(badBookData);
        expect(badParser.image).toBeFalsy();
    });
});
