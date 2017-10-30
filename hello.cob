       IDENTIFICATION DIVISION.
       PROGRAM-ID. COBOLNODEJS.
       ENVIRONMENT DIVISION.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
           01  FLG-FS.
       PROCEDURE DIVISION.
       MAIN.
           MOVE 1 TO FLG-FS.
           PERFORM UNTIL FLG-FS > 5
               DISPLAY "Hello World!"
               ADD 1 TO FLG-FS
           END-PERFORM.
           STOP RUN.
