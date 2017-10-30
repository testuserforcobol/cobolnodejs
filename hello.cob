       IDENTIFICATION DIVISION.
       PROGRAM-ID. COBOLNODEJS.
       ENVIRONMENT DIVISION.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
           01  FLG-FS.
       PROCEDURE DIVISION.
           MOVE 1 TO FLG-FS.
               DISPLAY "Hello World!".
               ADD 1 TO FLG-FS.
           EXIT PROGRAM.
