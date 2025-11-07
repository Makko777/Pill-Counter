//
//  OPD_Farmasi_HSMApp.swift
//  OPD Farmasi HSM
//
//  Created by Cda on 07/11/2025.
//

import SwiftUI
import SwiftData
import UniformTypeIdentifiers

@main
struct OPD_Farmasi_HSMApp: App {
    var body: some Scene {
        DocumentGroup(editing: .itemDocument, migrationPlan: OPD_Farmasi_HSMMigrationPlan.self) {
            ContentView()
        }
    }
}

extension UTType {
    static var itemDocument: UTType {
        UTType(importedAs: "com.example.item-document")
    }
}

struct OPD_Farmasi_HSMMigrationPlan: SchemaMigrationPlan {
    static var schemas: [VersionedSchema.Type] = [
        OPD_Farmasi_HSMVersionedSchema.self,
    ]

    static var stages: [MigrationStage] = [
        // Stages of migration between VersionedSchema, if required.
    ]
}

struct OPD_Farmasi_HSMVersionedSchema: VersionedSchema {
    static var versionIdentifier = Schema.Version(1, 0, 0)

    static var models: [any PersistentModel.Type] = [
        Item.self,
    ]
}
