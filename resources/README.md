# Temat projektu
Tematem projektu jest aplikacja obsługująca szkołę podstawową.

## Projekt bazy danych
![schemat bazy danych](./schema.svg "Schemat bazy")

### Wybrane fragmenty kodu SQL, służące do utworzenia powyższej struktury

Tabela z danymi użytkowników systemu

```SQL
create table szkola.User
(
    UserID       int auto_increment
        primary key,
    Email        varchar(100) not null,
    PasswordHash binary(60)   not null,
    Name         varchar(120) null,
    Surname      varchar(120) null,
    Address      varchar(200) null,
    UserRoleID   int          not null,
    PESEL        char(11)     not null,
    constraint User_PESEL_uindex
        unique (PESEL),
    constraint User_UserRole_UserRoleID_fk
        foreign key (UserRoleID) references szkola.UserRole (UserRoleID)
)
    comment 'Użytkownicy systemu';
```

Tabela z klasami
```SQL
create table if not exists szkola.Class
(
    ClassID          int auto_increment
        primary key,
    StartYear        int not null,
    GraduationYear   int not null,
    Preceptor_UserID int not null,
    ProfileID        int not null,
    constraint Class_ProfileID_StartYear_uindex
        unique (ProfileID, StartYear),
    constraint ClassYear_User_UserID_fk
        foreign key (Preceptor_UserID) references szkola.User (UserID),
    constraint Class_Profile_ProfileID_fk
        foreign key (ProfileID) references szkola.Profile (ProfileID)
)
    comment 'Klasy uczące się w szkole';
```

## Implementacja zapytań SQL
Wszystkie zapytania używane w aplikacji znajdują się w pliku [queries.json](../src/sql/queries.json). Niektóre bardziej ogólne zapytania są sparametryzowane, za pomocą składni wąsów - `{{parametr}}`. Pozwala to stosować tą samą ogólną strukturę zapytania do róznych tabel.

1. Logowanie
    ```SQL
    SELECT * FROM User WHERE Email = ?;
    ```
2. Zmiana hasła
   Parametr tableName - zmieniany przed użyciem zapytania na nazwę odpowiedniej tabeli. Pytajnik po SET zostaje zamieniony na zestaw wyrażeń `key = 'value'` ([dokumentacja](https://github.com/mysqljs/mysql#escaping-query-values))
    ```SQL
    UPDATE {{tableName}} SET ? WHERE {{tableName}}ID = ?;
    ```
3. Lista uprawnień użytkownika
    ```SQL
    SELECT
        P.*
    FROM
        User
        INNER JOIN RolePermission ON User.UserRoleID = RolePermission.UserRoleID
        INNER JOIN Permission P on RolePermission.PermissionID = P.PermissionID
    WHERE
        User.UserID = ?;
    ```
4. Sprawdzenie czy użytkownik ma dane uprawnienie
    ```SQL
    SELECT
        P.* FROM
    User
        INNER JOIN RolePermission ON User.UserRoleID = RolePermission.UserRoleID
        INNER JOIN Permission P on RolePermission.PermissionID = P.PermissionID
    WHERE
        User.UserID = ? AND P.PermissionID = ?;
    ```
5. Lista wszystkich ocen ucznia
    ```SQL
    SELECT
        Grade.GradeID,
        S.Name,
        S.ShortName,
        U.UserID,
        U.Name,
        U.Surname,
        U.Email,
        GV.NumericValue,
        GV.SymbolicValue,
        GV.Name,
        GV.ShortName,
        Grade.Weight,
        Grade.IssuedAt
    FROM
        Grade
        INNER JOIN GradeValue GV on Grade.GradeValueID = GV.GradeValueID
        INNER JOIN Subject S on Grade.SubjectID = S.SubjectID
        INNER JOIN User U on Grade.Issuer_UserID = U.UserID
    WHERE
        Grade.Owner_UserID = ?;
    ```
6. Lista ocen klasy z danego przedmiotu (dziennik)
    ```SQL
    SELECT
        GradeID,
        Student.UserID,
        GV.NumericValue,
        GV.SymbolicValue,
        GV.Name,
        GV.ShortName
    FROM
        Grade
        INNER JOIN GradeValue GV on Grade.GradeValueID = GV.GradeValueID
        INNER JOIN Student ON Student.UserID = Grade.Owner_UserID
    WHERE
        Student.ClassID = ? AND Grade.SubjectID = ?;
    ```
7. Plan lekcji dla danego użytkownika
    ```SQL
    SELECT
        T1.TimetableID,
        T1.TimeStart,
        T1.TimeEnd,
        T1.DayNumber,
        Subject.Name,
        Subject.ShortName,
        YEAR(CURRENT_DATE()) - Class.StartYear AS ClassYear,
        P.ShortName,
        P.FullName,
        User.Name,
        User.Surname,
        T1.Teacher_UserID,
        T1.ReplacementTeacher_UserID
    FROM
    (
            SELECT
                Timetable.*,
                CST.Teacher_UserID
            FROM
                Timetable
            INNER JOIN Student S on Timetable.ClassID = S.ClassID
            INNER JOIN ClassSubjectTeacher CST on Timetable.SubjectID = CST.SubjectID and Timetable.ClassID = CST.ClassID
            WHERE S.UserID = {{userID}}
        UNION
            SELECT
                Timetable.*,
                CST.Teacher_UserID
            FROM
                Timetable
            INNER JOIN ClassSubjectTeacher CST on Timetable.SubjectID = CST.SubjectID and Timetable.ClassID = CST.ClassID
            WHERE
                (CST.Teacher_UserID = {{userID}} AND ReplacementTeacher_UserID IS NULL)
            OR
                ReplacementTeacher_UserID = {{userID}}
    ) as T1
        INNER JOIN Subject ON T1.SubjectID = Subject.SubjectID
        INNER JOIN Class ON T1.ClassID = Class.ClassID
        INNER JOIN Profile P on Class.ProfileID = P.ProfileID
        INNER JOIN User ON User.UserID = T1.Teacher_UserID
    ORDER BY
        DayNumber ASC,
        TimeStart ASC;
    ```
8. Lista klas w których nauczyciel ma wychowawstwo
    ```SQL
    SELECT
        Class.ClassID, Class.StartYear, Class.GraduationYear,
        YEAR(CURRENT_DATE()) - Class.StartYear AS ClassYear,
        P.ShortName,
        P.FullName
    FROM
        Class
        INNER JOIN Profile P on Class.ProfileID = P.ProfileID
    WHERE Preceptor_UserID = ?;
    ```
9.  Create/Update/Delete oceny z przedmiotu
    Create
    ```ts
    tableName = Grade,
    fieldList = ['GradeValueID', 'SubjectID', 'Issuer_UserID', 'Owner_UserID', 'Weight']
    ? = [
        [8, 3, 750, 300, 2]
    ]
    ```
    ```SQL
    INSERT INTO {{tableName}} ({{fieldList}}) VALUES ?;
    ```
    Update
    ```ts
    tableName = Grade,
    ? = {
        GradeValueID: 10
    },
    ? = 400
    ```
    ```SQL
    UPDATE {{tableName}} SET ? WHERE {{tableName}}ID = ?
    ```
    Delete (`tableName = Grade`)
    ```SQL
    Delete from {{tableName}} Where {{tableName}}ID = ?;
    ```
10. Najnowsze oceny ucznia
    ```SQL
    SELECT
        Grade.GradeID,
        S.Name,
        S.ShortName,
        U.UserID,
        U.Name,
        U.Surname,
        U.Email,
        GV.NumericValue,
        GV.SymbolicValue,
        GV.Name,
        GV.ShortName,
        Grade.Weight,
        Grade.IssuedAt
    FROM
        Grade
    INNER JOIN GradeValue GV on Grade.GradeValueID = GV.GradeValueID
    INNER JOIN Subject S on Grade.SubjectID = S.SubjectID
    INNER JOIN User U on Grade.Issuer_UserID = U.UserID
    WHERE Grade.Owner_UserID = ? AND DATEDIFF(CURRENT_TIMESTAMP, Grade.IssuedAt) < ?
    ORDER BY Grade.IssuedAt DESC;
    ```
11. Ostatnio wystawione przez nauczyciela oceny
    ```SQL
    SELECT
        Grade.GradeID,
        S.Name,
        S.ShortName,
        U.UserID,
        U.Name,
        U.Surname,
        U.Email,
        GV.NumericValue,
        GV.SymbolicValue,
        GV.Name,
        GV.ShortName,
        Grade.Weight,
        Grade.IssuedAt
    FROM
        Grade
        INNER JOIN GradeValue GV on Grade.GradeValueID = GV.GradeValueID
        INNER JOIN Subject S on Grade.SubjectID = S.SubjectID
        INNER JOIN User U on Grade.Owner_UserID = U.UserID
    WHERE Grade.Issuer_UserID = ? AND DATEDIFF(CURRENT_TIMESTAMP, Grade.IssuedAt) < ?
    ORDER BY Grade.IssuedAt;
    ```
12. Top 10 uczniów z najlepszą w szkole średnią łączną ze swoich przedmiotów
    ```SQL
    SELECT
        Grade.Owner_UserID,
        SUM(GV.NumericValue)/SUM(Grade.Weight) AverageGrade,
        COUNT(Grade.GradeID) GradeCount,
        U.Email, U.Name, U.Surname, U.Address, U.PESEL,
        YEAR(CURRENT_DATE()) - C.StartYear Year,
        P.ShortName,
        P.FullName
    FROM
        Grade
        INNER JOIN GradeValue GV on Grade.GradeValueID = GV.GradeValueID
        INNER JOIN User U on Grade.Owner_UserID = U.UserID
        INNER JOIN Student S on U.UserID = S.UserID
        INNER JOIN Class C on S.ClassID = C.ClassID
        INNER JOIN Profile P on C.ProfileID = P.ProfileID
    GROUP BY Grade.Owner_UserID
    ORDER BY
        AverageGrade DESC,
        GradeCount DESC
    LIMIT 10;
    ```
13. TOP 10 klas z najlepszą łączną średnią ocen w szkole
    ```SQL
    SELECT
        Student.ClassID,
        SUM(GV.NumericValue)/SUM(Grade.Weight) Average,
        YEAR(CURRENT_DATE()) - C.StartYear Year,
        P.ShortName Profile_ShortName,
        P.FullName Profile_FullName,
        U.Name Preceptor_Name,
        U.Surname Preceptor_Surname,
        U.Email Preceptor_Email,
        C.Preceptor_UserID
    FROM
        Grade
        INNER JOIN Student ON Grade.Owner_UserID = Student.UserID
        INNER JOIN GradeValue GV on Grade.GradeValueID = GV.GradeValueID
        INNER JOIN Class C on Student.ClassID = C.ClassID
        INNER JOIN Profile P on C.ProfileID = P.ProfileID
        INNER JOIN User U on C.Preceptor_UserID = U.UserID
    GROUP BY Student.ClassID
    Order BY Average DESC
    LIMIT 10;
    ```
14. Lista współklasowiczów danego użytkownika
    ```SQL
    SELECT
        User.*,
        ClassID
    FROM
        User
        Inner JOIN Student S on User.UserID = S.UserID
    WHERE ClassID IN (
        SELECT ClassID from Student WHERE UserID = 1
    );
    ```
15. Lista uczniów klasy, którym wychodzą zagrożenia, z listą przedmiotów zagrożonych
    ```SQL
    SELECT
        Owner_UserID,
        SUM(GV.NumericValue)/SUM(Grade.Weight) Average,
        S.Name,
        S.ShortName
    FROM
        Grade
        Inner join GradeValue GV on Grade.GradeValueID = GV.GradeValueID
        INNER JOIN Subject S on Grade.SubjectID = S.SubjectID
    GROUP BY Owner_UserID, S.SubjectID
    HAVING Average < 2;
    ```
16. Lista uczniów kwalifikujących sie do stypendium/świadectwa z paskiem za średnią ocen
    ```SQL
    SELECT
        U.UserID, U.Email, U.Name, U.Surname, U.Address, U.PESEL,
        SUM(GV.NumericValue)/SUM(Grade.Weight) Average
    FROM
        Grade
        INNER JOIN User U on Grade.Owner_UserID = U.UserID
        INNER JOIN GradeValue GV on Grade.GradeValueID = GV.GradeValueID
    GROUP BY Grade.Owner_UserID
    HAVING Average >= 4.75;
    ```
17. Lista klas które uczy dany nauczyciel, z przedmiotami których tam uczy
    ```SQL
    SELECT
        Class.ClassID,
        Class.StartYear,
        YEAR(current_timestamp) - Class.StartYear Year,
        Profile.ShortName,
        Profile.FullName,
        GROUP_CONCAT(Subject.Name) Subjects
    FROM
        ClassSubjectTeacher
        INNER JOIN Class ON ClassSubjectTeacher.ClassID = Class.ClassID
        INNER JOIN Profile on Class.ProfileID = Profile.ProfileID
        INNER JOIN Subject on ClassSubjectTeacher.SubjectID = Subject.SubjectID
    WHERE ClassSubjectTeacher.Teacher_UserID = ?
    GROUP BY Class.ClassID;
    ```

## Aplikacja
Jest to apliacja okienkowa, napisana za pomoca biblioteki React.js oraz Electron. W obecnej postaci pozwala na zalogowanie się za pomocą adresu email i hasła, oraz na sprawdzenie swojego planu zajęć.

## Dodatkowe uwagi
W tej sekcji możecie zawrzeć informacje, których nie jesteście w stanie przypisać do pozostałych. Mogą to być również jakieś komentarze, wolne uwagi, itp.
