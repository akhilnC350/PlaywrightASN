# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - button "Home" [ref=e5] [cursor=pointer]
    - strong [ref=e6]: XYZ Bank
    - button "Logout" [ref=e7] [cursor=pointer]
  - generic [ref=e9]:
    - generic [ref=e10]:
      - strong [ref=e11]:
        - text: Welcome
        - generic [ref=e12]: Harry Potter
        - text: "!!"
      - combobox [ref=e13]:
        - option "1004" [selected]
        - option "1005"
        - option "1006"
    - generic [ref=e14]:
      - text: "Account Number :"
      - strong [ref=e15]: "1004"
      - text: ", Balance :"
      - strong [ref=e16]: "1000"
      - text: ", Currency :"
      - strong [ref=e17]: Dollar
    - generic [ref=e18]:
      - button "Transactions" [ref=e19] [cursor=pointer]
      - button "Deposit" [ref=e20] [cursor=pointer]
      - button "Withdrawl" [ref=e21] [cursor=pointer]: Withdrawl
    - form [ref=e25]:
      - generic [ref=e26]:
        - generic [ref=e27]: "Amount to be Withdrawn :"
        - spinbutton [active] [ref=e28]
      - button "Withdraw" [ref=e29] [cursor=pointer]
```