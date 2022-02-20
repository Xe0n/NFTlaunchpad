# 🏗 Платформа EAZY_GO

🧪 Платформа позволит новичкам (и не только) брать в аренду игровые NFT-предметы у более опытных игроков, у которых какая-то часть предметов "пылится" без дела, при этом платформа обеспечивает гарантию возврата токена или его стоимости за счёт использования механизма залога.

Основное отличие от других механизмов аренды NFT в том, что аренда обходится арендатору практически бесплатно, а арендодатель зарабатывает от размещения залога на Aave.


# 🏄‍♂️ Quick Start
Запуск фронта

 yarn install <br>
 yarn start <br>


Запуск бэка

cd packages/node-express-boilerplate

yarn run dev

yarn deploy

Тестовая сеть Kovan

Для теста используем два аккаунта, регистрируемся, добавляем NFT. 

Со второго аккаунта мы регистрируемся и на главной странице выбираем NFT, переходим на него и попадаем на страницу заключения договора. Вносим условия и оплачиваем депозит залога, после этого нажимаем купить. Первый пользователь заходит на страницу "Сделки в ожидании" где видит новый договор который он может подтвердить, нажимает aprove (Деньги падают на депозит в aave пул)

Через некоторое время у обоих пользователей в разделе мои договора отображается новый договор.



