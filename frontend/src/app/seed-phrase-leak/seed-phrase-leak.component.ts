import { ConfigurationService } from '../Services/configuration.service'
import { Component, OnInit } from '@angular/core'
import { KeysService } from '../Services/keys.service'

@Component({
  selector: "app-seed-phrase-leak",
  templateUrl: "./seed-phrase-leak.component.html",
  styleUrls: ["./seed-phrase-leak.component.scss"],
})
export class SeedPhraseLeakComponent {
  privateKey: string
  formSubmitted: boolean = false
  successResponse: boolean = false

  constructor (private readonly keysService: KeysService) {}

  ngOnInit () {
    this.checkChallengeStatus()
  }

  checkChallengeStatus () {
    this.keysService.seedPhraseSolved().subscribe(
      (response) => {
        this.successResponse = response.status
      },
      (error) => {
        console.error(error)
        this.successResponse = false
      }
    )
  }

  submitForm () {
    this.formSubmitted = true
    this.keysService.submitKey(this.privateKey).subscribe(
      (response) => {
        console.log(response)
        if (response.success) {
          this.successResponse = true
        } else {
          this.successResponse = false
        }
      },
      (error) => {
        console.error(error)
        this.successResponse = false
      }
    )
  }
}